({
	/*
	 * Invoke with r.js -o build.js
	 * Documentation of available options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
	 */
	baseUrl: "scripts",
	mainConfigFile: 'scripts/includes.js',
	out: "js/main.built.js",
	optimize: 'uglify',
	include : ['main'],
	findNestedDependencies: true,
	preserveLicenseComments: false

})
