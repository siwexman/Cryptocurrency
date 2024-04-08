const currency = document.querySelector('#currency');

const crypto = fetch('https://api.coincap.io/v2/assets')
    .then(res => res.json())
    .then(res => res.data.map(cur => cur.name));

async function logCrypto(symbol) {
    const response = await fetch('https://api.coincap.io/v2/assets');
    const data = await response.json();
    const cryptoArr = data.data;
    console.log(cryptoArr);
    cryptoArr.forEach(element => {});
    const mapArr = cryptoArr.map(cur => cur.name);
    const findCur = cryptoArr.find(cur => cur.symbol === symbol);
    console.log(findCur);
}
logCrypto('BTC');

async function createDivWithLabels() {
    const response = await fetch('https://api.coincap.io/v2/assets');
    const data = await response.json();
    const crypto = data.data;

    crypto.forEach(element => {
        const newDiv = document.createElement('div');
        const html = `
        <div class="content">
        <label>${element.rank}</label>
        <label>${element.name}</label>
        <label>${element.symbol}</label>
        <label>${new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(element.priceUsd)}</label>
        </div>
        `;
        newDiv.innerHTML = html;

        // Append the div to the body of the HTML document
        currency.appendChild(newDiv);

        // Simulate an asynchronous operation with setTimeout
        // new Promise(resolve => setTimeout(resolve, 1000));

        // Return the created div
        return newDiv;
    });
}

createDivWithLabels();

const string = '0123456789';
console.log(string.trim());
