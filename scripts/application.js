/* Application */

define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'models/session',
	'vent',
	'router',
	'views/user_nav_menu'
], function($, _, Backbone, Marionette, session, vent, Router, UserNavMenuView) {

	var application = new Marionette.Application();


	// Application Layout
	//
	application.addRegions({
		main_region: "#main",
		 nav_region: "#navigation",
		user_region: "#user",
		list_region: "#list",
		info_region: "#info"
	});


	// Application Constructor
	//
	application.addInitializer(function () {
		this.session = session;
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
			vent.trigger("application:user:show");
		}
	});


	// Render Event receiver
	//
	vent.on("application.show", function(view) {
		application.main_region.show(view);
	});

	vent.on("application:nav:show", function(view) {
		application.nav_region.show(view);
	});

	vent.on("application:list:show", function(view) {
		application.list_region.show(view);
	});

	vent.on("application:info:show", function(view) {
		application.info_region.show(view);
	});

	vent.on("application:user:show", function() {
		application.user_region.show(new UserNavMenuView());
	});

	// Redirect back to intended destination after authorization
	//
	vent.on("session.login", function() {
		Backbone.history.navigate(application.intended_destination, {trigger: true});
		vent.trigger("application:user:show");
	});


	vent.on("session.logout", function() {
		application.info_region.reset();
		application.list_region.reset();
		application.nav_region.reset();
		application.user_region.reset();
		Backbone.history.navigate("#login", {trigger: true});
	});


	return application;
});
