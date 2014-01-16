/* Application */

define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'models/session',
	'vent',
	'router'
], function($, _, Backbone, Marionette, Session, vent, Router) {

	var application = new Marionette.Application();


	// Application Layout
	//
	application.addRegions({
		main_region: "#main"
	});


	// Application Constructor
	//
	application.addInitializer(function () {
		this.session = new Session;
		this.router  = new Router;
	});


	application.on("initialize:after", function() {
		// Login and redirect to intended destination
		// TODO move this into the router instead
		if(!this.session.logged_in()) {
			Backbone.history.start({silent: true});
			Backbone.history.navigate("#login", {trigger: true});
		}
		else {
			Backbone.history.start();
		}
	});


	// Render Event receiver
	//
	vent.on("application.show", function(view) {
		application.main_region.show(view);
	});


	return application;
});
