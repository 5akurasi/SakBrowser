document.getElementById('search-button').addEventListener('click', function() {
    const query = document.getElementById('search-query').value;
    if (query) {
        search(query);
    }
});

function search(query) {
    const apiKey = 'AIzaSyCXX32YeN6U3fURzBMaYc607dThQVgQO8o';  // Здесь вставь свой API-ключ
    const searchEngineId = '169b06708aa094ac0'; // Здесь вставь свой идентификатор поисковика
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
    resultsContainer.innerHTML = ''; // Очистить результаты

    results.forEach(result => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item');
        resultItem.innerHTML = `
            <a href="${result.link}" target="_blank">${result.title}</a>
            <p>${result.snippet}</p>
        `;
        resultsContainer.appendChild(resultItem);
    });
}

function displayNoResults() {
    const resultsContainer = document.querySelector('.results');
    resultsContainer.innerHTML = '<p>Результаты не найдены.</p>';
}
