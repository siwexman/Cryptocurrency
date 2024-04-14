const currency = document.querySelector('#currency');

// https://assets.coincap.io/assets/icons/{symbol in lowercase}@2x.png - icons

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
        // const html = `
        // <div class="content">
        // <label>${element.rank}</label>
        // <label>${element.name}</label>
        // <label>${element.symbol}</label>
        // <label>${new Intl.NumberFormat('en-US', {
        //     style: 'currency',
        //     currency: 'USD',
        // }).format(element.priceUsd)}</label>
        // </div>
        // `;
        const html = `
        <tr>
            <td>
                <p>${}</p>
            </td>
            <td>
                <p>
                    <img src="https://assets.coincap.io/assets/icons/{symbol in lowercase}@2x.png">
                    ${}
                </p>
            </td>
            <td>
                <p>${}</p>
            </td>
            <td class="text-right">
                <p>${}</p>
            </td>
            <td>
                
            </td>
            <td>
            
            </td>
            <td>
            
            </td>
        </tr>
        `;

        newDiv.innerHTML = html;

        currency.appendChild(newDiv);

        return newDiv;
    });
}

createDivWithLabels();

const string = '0123456789';
console.log(string.trim());
