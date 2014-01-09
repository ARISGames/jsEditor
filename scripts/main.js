require.config({
	paths: {
		/* Using AMD forks for non AMD compliant libraries */

		jquery: 'library/jquery',

		/* Backbone */
		underscore: 'library/underscore',
		backbone: 'library/backbone',

		/* Marionette */
		'backbone.babysitter': 'library/backbone.babysitter',
		'backbone.wreqr': 'library/backbone.wreqr',
		marionette: 'library/backbone.marionette'
	}
});

require(['application'], function(Application) {
	new Application;
});

