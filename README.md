# An Opinionated Config Loader

Loads config files from a namespace in common linux directories.  Also supports loading environment dependant config files.  This modules uses `require` so is syncronous and supports anything that can be required.

## Install

```
$ npm install --save json-config-loader
```

## Basic Usage

```javascript
var loadConfig = require('json-config-loader');

var config = loadConfig({
	namespace: 'musicmap'
});

/*
Config is now an object containing these files merged togeter:

/etc/musicmap/main.json
/etc/musicmap/dev.json
/usr/local/etc/musicmap/main.json
/usr/local/etc/musicmap/dev.json
*/
```

## Advanced Options

```javascript
var config = loadConfig({
	namespace: 'musicmap',
	mainfile: 'custom',
	extention: 'js',
	env: 'production',
	configDirectories: [
		// Load config from app dir
		// /usr/local/src/musicmap/app/config
		__dirname + '/config',
		'/etc',
		'/usr/local/etc'
	]
}, {
	// Default config options
	defaults: 'foobar'
});

/*
Config is now an object containing these files merged togeter:

/usr/local/src/musicmap/app/config/musicmap/custom.js
/usr/local/src/musicmap/app/config/musicmap/production.js
/etc/musicmap/custom.js
/etc/musicmap/production.js
/usr/local/etc/musicmap/custom.js
/usr/local/etc/musicmap/production.js
*/
```
