# SoundCloud Scraper

import json
from datetime import datetime
import re
import logging
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import StaleElementReferenceException, TimeoutException
import time

logging.basicConfig(level=logging.DEBUG, 
                   format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def setup_driver():
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--window-size=1920,1080")
    return webdriver.Chrome(options=chrome_options)

def get_image_url(playlist, max_retries=3, delay=1):
    for attempt in range(max_retries):
        try:
            image_element = WebDriverWait(playlist, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, "span[style*='background-image']"))
            )
            
            style = image_element.get_attribute("style")
            if not style:
                logger.debug(f"Style attribute empty, retrying... (attempt {attempt + 1})")
                time.sleep(delay)
                continue
                
            image_url = re.search(r'url\("(.+?)"\)', style)
            if image_url:
                return image_url.group(1)
            
            logger.debug(f"Image URL not found, retrying... (attempt {attempt + 1})")
            time.sleep(delay)
            
        except (StaleElementReferenceException, TimeoutException) as e:
            logger.debug(f"Attempt {attempt + 1}: {str(e)}")
            time.sleep(delay)
            
    return ''

def scroll_to_load_all_content(driver):
    logger.debug("Starting scroll to load all content")
    
    last_height = driver.execute_script("return document.body.scrollHeight")
    playlists_count = 0
    no_change_count = 0
    max_no_change = 3
    
    while True:
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        
        time.sleep(3)
        
        current_playlists = len(driver.find_elements(By.CLASS_NAME, "sound.playlist.streamContext"))
        logger.debug(f"Current number of playlists found: {current_playlists}")
        
        new_height = driver.execute_script("return document.body.scrollHeight")
        
        if current_playlists == playlists_count:
            no_change_count += 1
            logger.debug(f"No new playlists loaded. No change count: {no_change_count}")
        else:
            no_change_count = 0
            playlists_count = current_playlists
            logger.debug("Found new playlists, resetting no change count")
        
        if new_height == last_height or no_change_count >= max_no_change:
            time.sleep(5)
            logger.debug("Reached end of scrolling")
            break
            
        last_height = new_height
        logger.debug(f"Scrolled to height: {last_height}")

def scrape_soundcloud_playlists(url):
    playlists = []
    driver = None
    
    try:
        logger.debug(f"Starting Chrome driver")
        driver = setup_driver()
        
        logger.debug(f"Attempting to fetch URL: {url}")
        driver.get(url)
        
        logger.debug("Waiting for initial playlist elements to load...")
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, "sound__content"))
        )

        time.sleep(3)
        
        scroll_to_load_all_content(driver)
        
        # Find all playlist elements
        playlist_elements = driver.find_elements(By.CLASS_NAME, "sound.playlist.streamContext")
        logger.debug(f"Found total of {len(playlist_elements)} playlist elements after scrolling")
        
        for idx, playlist in enumerate(playlist_elements, 1):
            logger.debug(f"\nProcessing playlist {idx}")
            playlist_data = {}
            
            try:
                time.sleep(0.5)
                
                # Extract title
                title_element = WebDriverWait(playlist, 10).until(
                    EC.presence_of_element_located((By.CSS_SELECTOR, "a.sc-link-primary.soundTitle__title"))
                )
                playlist_data['title'] = title_element.text
                logger.debug(f"Extracted title: {playlist_data['title']}")
                
                # Extract date
                date_element = WebDriverWait(playlist, 10).until(
                    EC.presence_of_element_located((By.CSS_SELECTOR, "time.relativeTime"))
                )
                datetime_str = date_element.get_attribute("datetime")
                date_obj = datetime.strptime(datetime_str, '%Y-%m-%dT%H:%M:%S.%fZ')
                playlist_data['date'] = date_obj.strftime('%Y-%m-%d')
                logger.debug(f"Extracted date: {playlist_data['date']}")
                
                # Extract image URL
                playlist_data['image'] = get_image_url(playlist)
                logger.debug(f"Extracted image URL: {playlist_data['image']}")
                
                # Extract link
                playlist_data['link'] = title_element.get_attribute("href")
                logger.debug(f"Extracted link: {playlist_data['link']}")
                
                # Extract text (artist info)
                username_element = WebDriverWait(playlist, 10).until(
                    EC.presence_of_element_located((By.CLASS_NAME, "soundTitle__username"))
                )
                username = username_element.text
                playlist_data['text'] = f"{playlist_data['title']} - {username}"
                logger.debug(f"Extracted text: {playlist_data['text']}")
                
                # Extract genre
                try:
                    genre_element = WebDriverWait(playlist, 5).until(
                        EC.presence_of_element_located((By.CLASS_NAME, "sc-tag"))
                    )
                    playlist_data['genre'] = genre_element.text
                except:
                    playlist_data['genre'] = ''
                logger.debug(f"Extracted genre: {playlist_data['genre']}")
                
                # Extract track count
                try:
                    tracks_element = playlist.find_element(By.CLASS_NAME, "compactTrackList__moreLink")
                    tracks_match = re.search(r'View (\d+) tracks', tracks_element.text)
                    playlist_data['tracks'] = int(tracks_match.group(1)) if tracks_match else 0
                except:
                    track_items = playlist.find_elements(By.CLASS_NAME, "compactTrackList__item")
                    playlist_data['tracks'] = len(track_items)
                logger.debug(f"Extracted track count: {playlist_data['tracks']}")
                
                playlists.append(playlist_data)
                logger.debug(f"Added playlist {idx} to results")
                
            except Exception as e:
                logger.error(f"Error processing playlist {idx}: {str(e)}", exc_info=True)
                continue
        
        logger.debug(f"Total playlists processed: {len(playlists)}")
        
    except Exception as e:
        logger.error(f"Error scraping playlists: {str(e)}", exc_info=True)
    finally:
        if driver:
            driver.quit()
            logger.debug("Chrome driver closed")
    
    return playlists

def save_to_json(playlists, output_file='playlists.json'):
    try:
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(playlists, f, indent=2, ensure_ascii=False)
        logger.info(f"Successfully saved {len(playlists)} playlists to {output_file}")
    except Exception as e:
        logger.error(f"Error saving to JSON: {str(e)}", exc_info=True)


if __name__ == "__main__":
    url = "https://soundcloud.com/lindstedt/sets"
    logger.info("Starting script execution")
    playlists = scrape_soundcloud_playlists(url)
    logger.info(f"Retrieved {len(playlists)} playlists")
    save_to_json(playlists)