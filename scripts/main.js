/* Load paths for frameworks and application launcher */

require.config({
	paths: {
		/* Using AMD forks for non AMD compliant libraries */

		text: 'library/require.text',
		i18n: 'library/require.i18n',

		jquery: 'library/jquery',
		cookie: 'library/jquery.cookie',
		jqueryui: 'library/jquery.ui',

		/* Backbone */
		underscore: 'library/underscore',
		backbone: 'library/backbone',
		'underscore.string': 'library/underscore.string',

		/* Marionette */
		'backbone.babysitter': 'library/backbone.babysitter',
		'backbone.wreqr': 'library/backbone.wreqr',
		marionette: 'library/backbone.marionette',

		/* Bootstrap */
		bootstrap: 'library/bootstrap'
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
	}
});

require(['application'], function(application) {
	application.start();
});

