var path = require('path');

var Loader = function(opts, defaults) {
	// Default some things
	this.namespace = opts.namespace || 'app';
	this.mainfile = opts.mainfile || 'main';
	this.extention = opts.extention || '.json'
	this.env = opts.env || process.env.NODE_ENV || 'dev';
	this.configDirectories = opts.configDirectories || [
		'/etc',
		'/usr/local/etc'
	];
	this.defaults = defaults || {};
};

Loader.prototype.load = function() {
	// The config accumulator
	var conf = this.defaults;

	// Load from each config directory
	this.configDirectories.forEach(function(dir) {
		// Load the main file
		_readFile(conf, path.join(dir, this.namespace, this.mainfile + this.extention));

		// Load the env file
		_readFile(conf, path.join(dir, this.namespace, this.env + this.extention));
	}.bind(this));

	// Returns a simple config objct
	return conf;
};

function _readFile(conf, file) {
	try {
		var c = require(file);
	} catch(e) {
		if (e.name === 'SyntaxError') {
			throw e;
		}
		return false;
	}
	if (c) {
		_extend(conf, c);
	}
};

function _extend(obj, o) {
	if (!obj || !o) {
		return;
	}
	for (var i in o) {
		if (o[i] !== undefined) {
			obj[i] = o[i];
		}
	}
};

module.exports = function(opts, defaults) {
	return (new Loader(opts, defaults)).load();
};
module.exports.Loader = Loader;
