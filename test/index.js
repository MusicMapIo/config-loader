var load = require('../'),
	assert = require('assert'),
	path = require('path'),
	fixture = path.join.bind(path, path.resolve(__dirname, 'fixtures'));

describe('Config Loader', function() {

	it('should load config', function() {
		var config = load({
			configDirectories: [
				fixture('full', 'etc'),
				fixture('full', 'usr', 'local', 'etc')
			]
		});

		assert.equal(config.foo, 'bar');
		assert.equal(config.bar, 'dev override');
		assert.equal(config.boop, 'bop');
		assert.equal(config.bippity, 'bee');
		assert.equal(config.blargh, undefined);
	});

});
