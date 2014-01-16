/* Load paths for frameworks and application launcher */

require.config({
	paths: {
		/* Using AMD forks for non AMD compliant libraries */

		text: 'library/require.text',

		jquery: 'library/jquery',
		cookie: 'library/jquery.cookie',

		/* Backbone */
		underscore: 'library/underscore',
		backbone: 'library/backbone',

		/* Marionette */
		'backbone.babysitter': 'library/backbone.babysitter',
		'backbone.wreqr': 'library/backbone.wreqr',
		marionette: 'library/backbone.marionette',
	}
});

require(['application'], function(application) {
	application.start();
});

