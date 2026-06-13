document.addEventListener('DOMContentLoaded', function() {
    M.AutoInit();
    loadArticles();
});

function loadArticles() {
    const container = document.getElementById('news-container');
    container.innerHTML = '<div class="center-align" style="padding:40px;"><p>Loading news...</p></div>';

    fetch("https://api.spaceflightnewsapi.net/v4/articles/?limit=2")
        .then(response => response.json())
        .then(data => displayArticles(data.results))
        .catch(error => {
            container.innerHTML = '<div class="center-align" style="padding:40px;"><p>Failed to load news. Please try again later.</p></div>';
            console.error('API error:', error);
        });
}

function displayArticles(articles) {
    const container = document.getElementById('news-container');
    container.innerHTML = '';

    articles.forEach(article => {
        const date = new Date(article.published_at).toLocaleDateString('en-GB', {
            day: 'numeric', month: 'short', year: 'numeric'
        });

        const col = document.createElement('div');
        col.className = 'col s12 m6';
        col.innerHTML =
        `
            <div class="news-card card">
                <div class="card-image">
                    <img src="${article.image_url}" alt="${article.title}">
                </div>
                <div class="card-content">
                    <span class="news-tag">Space</span>
                    <span class="card-title">${article.title}</span>
                    <p>${article.summary}</p>
                    <div class="news-meta">
                        <i class="material-icons">schedule</i> ${date}
                    </div>
                </div>
                <div class="card-action">
                    <a href="${article.url}" target="_blank">Read more</a>
                </div>
            </div>`
        ;
        container.appendChild(col);
    });
}