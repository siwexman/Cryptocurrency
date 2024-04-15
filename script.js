const tableBody = document.querySelector('tbody');
const cryptocurrencies = {};

// https://assets.coincap.io/assets/icons/{symbol in lowercase}@2x.png - icons

async function createTable() {
    const response = await fetch('https://api.coincap.io/v2/assets');
    const data = await response.json();
    const cryptocurrency = data.data;

    cryptocurrency.forEach(crypto => {
        const tableRow = document.createElement('tr');
        const percentage = parseFloat(crypto.changePercent24Hr);

        const html = `
            <td>
                <p></p>
            </td>
            <td>
                <p>${crypto.rank}</p>
            </td>
            <td>
                <p>
                    <img src="https://assets.coincap.io/assets/icons/${crypto.symbol.toLowerCase()}@2x.png">
                    ${crypto.name}
                </p>
            </td>
            <td>
                <p>${parseFloat(crypto.priceUsd).toFixed(2)}$</p>
            </td>
            <td>
                ${
                    percentage > 0
                        ? `<p class="green">
                            <i class="fa fa-solid fa-sort-up"></i>
                            ${percentage.toFixed(2)}%
                        </p>`
                        : `<p class="red">
                            <i class="fa fa-solid fa-sort-down"></i>
                            ${percentage.toFixed(2).replace('-', '')}%
                        <p>`
                }
            </td>
            <td>
                <p>${parseFloat(crypto.volumeUsd24Hr).toFixed(2)}$</p>
            </td>
            <td>
                <p>${parseFloat(crypto.supply).toFixed(2)} ${crypto.symbol}</p>
            </td>
        `;

        tableRow.innerHTML = html;

        tableBody.appendChild(tableRow);

        return tableRow;
    });
}

// createTable();

// New

async function fetchCryptocurrencies() {
    try {
        const response = await fetch('https://api.coincap.io/v2/assets');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        displayTable(data.data);
    } catch (error) {
        console.log('There was a problem with your fetch operation:', error);
    }
}

function displayTable(currencies) {
    console.log(currencies);

    currencies.forEach(crypto => {
        let tableRow = tableBody.insertRow();

        let cellStar = tableRow.insertCell(0);
        let star = document.createElement('span');
        star.innerHTML = '&#9734'; //'☆'; // ★ &#9733
        star.classList.add('star');
        star.onclick = toggleFavourite;
        cellStar.appendChild(star);

        let cellRank = tableRow.insertCell(1);
        cellRank.innerHTML = `<p>${crypto.rank}</p>`;

        let cellName = tableRow.insertCell(2);
        cellName.innerHTML = `
                                <p>
                                <img src="https://assets.coincap.io/assets/icons/${crypto.symbol.toLowerCase()}@2x.png"> 
                                ${crypto.name}
                                </p>`;

        let cellSymbol = tableRow.insertCell(3);
        cellSymbol.innerHTML = `<p>${crypto.symbol}</p>`;

        let cellPrice = tableRow.insertCell(4);
        const price = parseFloat(crypto.priceUsd);
        cellPrice.innerHTML = `<p>${price.toFixed(2)}$</p>`;

        let cellPercentage = tableRow.insertCell(5);
        const percentage = parseFloat(crypto.changePercent24Hr);
        cellPercentage.innerHTML = `${
            percentage > 0
                ? `
                <p class="green">
                <i class="fa fa-solid fa-sort-up"></i> 
                ${percentage.toFixed(2)}%
                </p>`
                : `
                <p class="red">
                <i class="fa fa-solid fa-sort-down"></i> 
                ${percentage.toFixed(2).replace('-', '')}
                </p>`
        }`;

        let cellVolume = tableRow.insertCell(6);
        cellVolume.innerHTML = `
        <p>${parseFloat(crypto.volumeUsd24Hr).toFixed(2)}$</p>`;
    });
}

fetchCryptocurrencies();

function toggleFavourite() {}
