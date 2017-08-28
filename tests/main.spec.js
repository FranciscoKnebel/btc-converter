const expect = require('chai').expect;
const cp = require('child_process');

const pkg = require('../package.json');

const btcConverter = 'src/main.js';

function execute(command, callback) {
	switch (process.platform) {
	case 'win32':
		cp.exec(`node ${command}`, callback);

		break;
	case 'linux':
	default:
		cp.exec(`./${command}`, callback);
	}
}

describe('Main CLI', function () {
	it('should return the current version with argument --version', async () => {
		execute(`${btcConverter} --version`,
			(err, stdout /* , stderr */) => {
				if (err) { throw err; }

				expect(stdout.replace('\n', '')).to.be.equal(pkg.version);
			},
		);
	});

	it('should return the package description with argument --help', async () => {
		execute(`${btcConverter} --help`,
			(err, stdout /* , stderr */) => {
				expect(stdout.includes(pkg.description)).to.be.true;
			},
		);
	});

	it('should return the currency option when run with argument --help', async () => {
		execute(`${btcConverter} --help`,
			(err, stdout /* , stderr */) => {
				expect(stdout.includes('--currency')).to.be.true;
			},
		);
	});

	it('should return the amount option when run with argument --help', async () => {
		execute(`${btcConverter} --help`,
			(err, stdout /* , stderr */) => {
				expect(stdout.includes('--amount')).to.be.true;
			},
		);
	});
});
