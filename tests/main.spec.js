const expect = require('chai').expect;
const cp = require('child_process');

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

describe('Main CLI', () => {
	it('should return Hello World', (done) => {
		execute(btcConverter,
			(err, stdout /* , stderr */) => {
				if (err) { throw err; }

				expect(stdout.replace('\n', '')).to.be.equal('Hello World!');
				done();
			},
		);
	});
});
