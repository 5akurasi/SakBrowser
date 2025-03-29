document.getElementById('search-button').addEventListener('click', function() {
    const query = document.getElementById('search-query').value;
    if (query) {
        search(query);
    }
});

function search(query) {
    const apiKey = 'AIzaSyCXX32YeN6U3fURzBMaYc607dThQVgQO8o';  // API-ключ
    const searchEngineId = '169b06708aa094ac0'; // ID поисковика
    const url = `https://www.googleapis.com/customsearch/v1?q=${query}&key=${apiKey}&cx=${searchEngineId}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.items) {
                displayResults(data.items);
            } else {
                displayNoResults();
            }
        })
        .catch(error => console.error('Ошибка поиска:', error));
}

function displayResults(results) {
    const resultsContainer = document.querySelector('.results');
    resultsContainer.innerHTML = ''; // Очистить старые результаты

    results.forEach(result => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item');
        resultItem.innerHTML = `
            <a href="${result.link}" class="search-link">${result.title}</a>
            <p>${result.snippet}</p>
        `;
        resultsContainer.appendChild(resultItem);
    });

    // Перехватываем клик по ссылке и открываем в том же окне
    document.querySelectorAll('.search-link').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Отмена стандартного поведения
            window.location.href = this.href; // Открытие в том же окне
        });
    });
}

function displayNoResults() {
    const resultsContainer = document.querySelector('.results');
    resultsContainer.innerHTML = '<p>Результаты не найдены. ;)</p>';
}
