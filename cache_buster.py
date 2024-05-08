import os
import re

# Script to update all CSS and JS imports to prevent browsers from loading old, cached files

def cache_buster(directory, css_version, js_version):
    html_files = [f for f in os.listdir(directory) if f.endswith('.html')]

    for html_file in html_files:
        file_path = os.path.join(directory, html_file)
        with open(file_path, 'r') as f:
            content = f.read()

        updated_content = re.sub(r'<link\s+rel="stylesheet"\s+href="([^"]+\.css)"', 
                                 f'<link rel="stylesheet" href="\\1?v={css_version}"', content)

        updated_content = re.sub(r'<script\s+src="([^"]+\.js)"', 
                                 f'<script src="\\1?v={js_version}"', updated_content)

        with open(file_path, 'w') as f:
            f.write(updated_content)

        print(f'Updated HTML file: {file_path}')


if __name__ == "__main__":
    directories = ['./', 'audio', 'blog', 'downloads', 'src']
    css_version = '1.1'
    js_version = '1.1'

    for i in directories:
        cache_buster(i, css_version, js_version)
