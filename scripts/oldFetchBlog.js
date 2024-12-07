async function fetchLatestBlogPost() {
    try {
        const response = await fetch('../data/blog/index.json');
        const postIndex = await response.json();

        // Sort posts by index
        const sortedPosts = postIndex.sort((a, b) => b.index - a.index);

        // Get filename of latest blog post
        const latestPostFileName = sortedPosts[0].fileName;
        const latestPost = sortedPosts[0];

        // Fetch content of latest blog post
        const postResponse = await fetch(`blog/${latestPostFileName}`);
        const postContent = await postResponse.text();

        // Parse Markdown content to extract title and date
        const lines = postContent.split('\n');
        const title = lines[0].replace(/^# /, ''); // Extract title from first line
        const date = latestPost.publishDate;

        document.getElementById('latestBlogIcon').src = latestPost.icon;

        // Update HTML with latest blog post details
        document.getElementById('latestBlogTitle').textContent = title;
        document.getElementById('latestBlogDate').textContent = date;

        // Adjust font size and line height of title based on n characters
        const titleElement = document.getElementById('latestBlogTitle');
                    const titleTextLength = title.length;
                    if (titleTextLength < 13) {
                        titleElement.style.fontSize = '24px'; 
                        titleElement.style.lineHeight = '28px';
                    } else if (titleTextLength < 20) {
                        titleElement.style.fontSize = '20px';
                        titleElement.style.lineHeight = '24px';
                    } else {
                        titleElement.style.fontSize = '16px'; 
                        titleElement.style.lineHeight = '20px';
                    }
                            
    } catch (error) {
        console.error('Error fetching latest blog post:', error);
    }
}

fetchLatestBlogPost();