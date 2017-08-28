const request = require('request-promise-native');

function convertBTC(currency = 'USD', amount = '1') {
	const url = `https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=${currency}&amount=${amount}`;

	return request(url)
		.then(body => JSON.parse(body))
		.then((response) => {
			console.log(`${amount} BTC to ${currency} = ${response.price}`);
		});
}

module.exports = convertBTC;
