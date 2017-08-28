const nock = require('nock');
const sinon = require('sinon');

const chai = require('chai');
const sinonChai = require('sinon-chai');
const convertBTC = require('../src/convertBTC');

const expect = chai.expect;
chai.use(sinonChai);

describe('Convert BTC', () => {
	let consoleStub;

	const responseMock = {
		success: true,
		price: 2490.78,
	};

	beforeEach(() => {
		consoleStub = sinon.stub(console, 'log');
	});

	afterEach(() => {
		consoleStub.restore();
	});

	it('should use default values of USD for currency and 1 for amount', async () => {
		nock('https://apiv2.bitcoinaverage.com')
			.get('/convert/global')
			.query({ from: 'BTC', to: 'USD', amount: 1 })
			.reply(200, responseMock);

		await convertBTC();
		expect(consoleStub).to.have.been.calledWith(`1 BTC to USD = ${responseMock.price}`);
	});

	it('should use USD for currency and 1 for amount when defined', async () => {
		nock('https://apiv2.bitcoinaverage.com')
			.get('/convert/global')
			.query({ from: 'BTC', to: 'USD', amount: 10 })
			.reply(200, responseMock);

		await convertBTC('USD', 10);
		expect(consoleStub).to.have.been.calledWith(`10 BTC to USD = ${responseMock.price}`);
	});

	it('should use BRL for currency and 100 for amount when defined', async () => {
		nock('https://apiv2.bitcoinaverage.com')
			.get('/convert/global')
			.query({ from: 'BTC', to: 'BRL', amount: 100 })
			.reply(200, responseMock);

		await convertBTC('BRL', 100);
		expect(consoleStub).to.have.been.calledWith(`100 BTC to BRL = ${responseMock.price}`);
	});

	it('should use BRL for currency when defined, and use 1 as default amount', async () => {
		nock('https://apiv2.bitcoinaverage.com')
			.get('/convert/global')
			.query({ from: 'BTC', to: 'BRL', amount: 1 })
			.reply(200, responseMock);

		await convertBTC('BRL');
		expect(consoleStub).to.have.been.calledWith(`1 BTC to BRL = ${responseMock.price}`);
	});

	it('should use 1000 for amount when defined, and use USD as default currency', async () => {
		nock('https://apiv2.bitcoinaverage.com')
			.get('/convert/global')
			.query({ from: 'BTC', to: 'USD', amount: 1000 })
			.reply(200, responseMock);

		await convertBTC(undefined, 1000);
		expect(consoleStub).to.have.been.calledWith(`1000 BTC to USD = ${responseMock.price}`);
	});
});
