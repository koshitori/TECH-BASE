const apiUrl = 'https://weather.tsukumijima.net/api/forecast/city/130010';

fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        displayData(data); // データを表示する関数を呼び出す
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });

function displayData(data) {
    const container = document.getElementById('data-container');
    container.innerHTML = '';

    data.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('data-item');

        const title = document.createElement('h3');
        title.textContent = item.title;

        const body = document.createElement('p');
        body.textContent = item.body;

        div.appendChild(title);
        div.appendChild(body);
        container.appendChild(div);
    });
}
