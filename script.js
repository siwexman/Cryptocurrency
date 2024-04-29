const tableBody = document.querySelector('tbody');

// https://assets.coincap.io/assets/icons/{symbol in lowercase}@2x.png - icons

async function createTable() {
    const response = await fetch('https://api.coincap.io/v2/assets');
    const data = await response.json();
    const cryptocurrency = data.data;

    cryptocurrency.forEach(crypto => {
        const tableRow = document.createElement('tr');
        const percent = parseFloat(crypto.changePercent24Hr);

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
                    percent > 0
                        ? `<p class="green">
                            <i class="fa fa-solid fa-sort-up"></i>
                            ${percent.toFixed(2)}%
                        </p>`
                        : `<p class="red">
                            <i class="fa fa-solid fa-sort-down"></i>
                            ${percent.toFixed(2).replace('-', '')}%
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

const currentPrices = {};
const favourites = new Set();
let showFavourites = false;

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
    const btn = document.querySelector('button');
    // console.log(currencies);

    currencies.forEach(crypto => {
        const price = parseFloat(crypto.priceUsd);
        const percent = parseFloat(crypto.changePercent24Hr);

        if (currentPrices[crypto.id] && currentPrices[crypto.id].row) {
            const row = currentPrices[crypto.id].row;

            updateTable(currentPrices[crypto.id].price, price, row.cells[4]);
            updateTable(
                currentPrices[crypto.id].percent,
                percent,
                row.cells[5],
                true
            );

            currentPrices[crypto.id].price = price;
            currentPrices[crypto.id].percent = percent;
        } else {
            let tableRow = tableBody.insertRow();

            let cellStar = tableRow.insertCell(0);
            let star = document.createElement('span');
            star.innerHTML = '&#9734'; //'☆'; // ★ &#9733
            star.classList.add('star');
            star.onclick = () => toggleFavourite(crypto, star);
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
            cellPrice.innerHTML = `
        <p>
        $${parseFloat(price).toFixed(2)}
        </p>`;

            let cellPercent = tableRow.insertCell(5);
            cellPercent.innerHTML = `${
                percent > 0
                    ? `
                <p class="green">
                <i class="fa fa-solid fa-sort-up"></i> 
                ${percent.toFixed(2)}%
                </p>`
                    : `
                <p class="red">
                <i class="fa fa-solid fa-sort-down"></i> 
                ${percent.toFixed(2).replace('-', '')}%
                </p>`
            }`;

            let cellVolume = tableRow.insertCell(6);
            cellVolume.innerHTML = `
        <p>${new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(parseFloat(crypto.volumeUsd24Hr))}</p>`;

            currentPrices[crypto.id] = {
                price: price,
                percent: percent,
                row: tableRow,
            };
        }
    });

    btn.addEventListener('click', () => displayFavourites(currencies));
}

function updateTable(currentValue, newValue, cell, isPercent = false) {
    if (isPercent) {
        if (currentValue !== newValue) {
            checkIfMinus(newValue, cell);
        }
    } else {
        if (currentValue !== newValue) {
            if (currentValue < newValue) {
                cell.parentNode.classList.add('update-up');
            } else if (currentValue > newValue) {
                cell.parentNode.classList.add('update-down');
            }
            cell.childNodes[1].innerText = `$${newValue.toFixed(2)}`;
            setTimeout(() => {
                cell.parentNode.classList.remove('update-up');
                cell.parentNode.classList.remove('update-down');
            }, 1000);
        }
    }
}

function checkIfMinus(value, cell) {
    if (value > 0) {
        cell.innerHTML = `
        <p class="green">
        <i class="fa fa-solid fa-sort-up"></i> 
        ${value.toFixed(2)}%
        </p>`;
    } else {
        cell.innerHTML = `
            <p class="red">
            <i class="fa fa-solid fa-sort-down"></i> 
            ${value.toFixed(2).replace('-', '')}%
            </p>`;
    }
}

function toggleFavourite(crypto, star) {
    if (favourites.has(crypto.name)) {
        favourites.delete(crypto.name);
        star.classList.remove('favourite');
    } else {
        favourites.add(crypto.name);
        star.classList.add('favourite');
    }
    console.log(favourites);
}

function displayFavourites(currencies) {
    showFavourites = !showFavourites;

    if (showFavourites) {
        const favourite = currencies.filter(element =>
            Array.from(favourites).includes(element.name)
        );
        console.log(favourite);
    }
}

setInterval(fetchCryptocurrencies, 5000);
fetchCryptocurrencies();
