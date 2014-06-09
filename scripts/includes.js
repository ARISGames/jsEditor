/* Load paths for frameworks */

require.config({
	baseUrl: 'scripts',

	paths: {
		/* Using AMD forks for non AMD compliant libraries */
		'text':     'library/require.text',
		'jed':      'library/jed',

		'jquery':   'library/jquery',
		'cookie':   'library/jquery.cookie',
		'jqueryui': 'library/jquery.ui',

		/* Backbone */
		'underscore':          'library/underscore',
		'backbone':            'library/backbone',
		'underscore.string':   'library/underscore.string',

		/* Marionette */
		'backbone.babysitter': 'library/backbone.babysitter',
		'backbone.wreqr':      'library/backbone.wreqr',
		'marionette':          'library/backbone.marionette',

		/* Bootstrap */
		'bootstrap': 'library/bootstrap',

		/* App Config */
		'config': 'config',

		/* Templages */
		'templates': '../templates'
	},

	shim: {
	   'underscore.string': {
			deps: ['underscore'],
		},

        "jqueryui": {
            exports: "$",
            deps: ['jquery']
        },

		'bootstrap' : {
			deps: ['jquery']
		}
	},

	/* Visual Debugging */
	config: {
		text: {
			xrayTemplateDebugging: (typeof document !== 'undefined') ? document.URL.match(/xray-goggles/) : false
		},

		moduleLog: (typeof document !== 'undefined') ? document.URL.match(/module-log/) : false
	}
});
