({
	/*
	 * Invoke with r.js -o build.js
	 * Documentation of available options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
	 */
	baseUrl: "scripts",
	mainConfigFile: 'scripts/includes.js',
	out: "dist/aris.js",
	optimize: 'uglify2',
	paths: {
		"inlineRequireJS": 'library/require',
		"config": 'config'
		// "config": 'empty' /* Load config.js every time */
	},
	include : ['inlineRequireJS', 'main'],
	findNestedDependencies: true,
	preserveLicenseComments: false,
	generateSourceMaps: true
})

