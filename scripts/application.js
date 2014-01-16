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


	// Authorization Redirect
	//
	application.on("initialize:after", function() {
		if(!this.session.logged_in()) {
			this.intended_destination = window.location.hash;
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


	// Redirect back to intended destination after authorization
	//
	vent.on("session.login", function(view) {
		Backbone.history.navigate(application.intended_destination, {trigger: true});
	});


	return application;
});
