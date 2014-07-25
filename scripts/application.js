/* Application */

define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'models/session',
	'vent',
	'router',
	'views/user_nav_menu',
	'views/alert'
], function($, _, Backbone, Marionette, session, vent, Router, UserNavMenuView, AlertView) {

	var application = new Backbone.Marionette.Application();


	// Application Layout
	//
	application.addRegions({
		  main_region: "#main",
		   nav_region: "#navigation",
		  user_region: "#user",
		  list_region: "#list",
		  info_region: "#info",
		dialog_region: "#modal-body"
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
			if(window.location.hash === "#login")
			{
				this.intended_destination = "#";
				Backbone.history.start();
			}
			else
			{
				this.intended_destination = window.location.hash;
				Backbone.history.start({silent: true});
				Backbone.history.navigate("#login", {trigger: true});
			}
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

	vent.on("application:nav:hide", function() {
		application.nav_region.reset();
	});

	vent.on("application:list:show", function(view) {
		application.list_region.show(view);
	});

	vent.on("application:list:hide", function() {
		application.list_region.reset();
	});

	vent.on("application:info:show", function(view) {
		application.info_region.show(view);
	});

	vent.on("application:info:hide", function() {
		application.info_region.reset();
	});

	vent.on("application:popup:show", function(view, title) {
		// TODO add a title property to views which is smart based on where its rendered

		// Reset
		$('#modal-title').text("");
		$('.modal-header').hide();

		// Notify View
		view.options.in_modal = true;

		application.dialog_region.show(view);
		$('.modal').modal('show');

		$('.modal').on("hidden.bs.modal", function() {
			application.dialog_region.reset();
		});

		if(title) {
			$('#modal-title').text(title);
			$('.modal-header').show();
		}
	});

	vent.on("application:popup:hide", function() {
		$('.modal').modal('hide');
	});

	vent.on("application:user:show", function() {
		application.user_region.show(new UserNavMenuView());
	});

	vent.on("application:alert", function(options) {
		$('.alert-text').text(options.text)
		$('.alert').show();
		$('.alert button').on('click', function() {
			$('.alert').hide();
		});
		//vent.trigger("application:popup:show", new AlertView({text: options.text}));
	});


	// Redirect back to intended destination after authorization
	//
	vent.on("session.login", function() {
		Backbone.history.navigate(application.intended_destination, {trigger: true});
		vent.trigger("application:user:show");
	});


	vent.on("session.logout", function() {
		// TODO each region listen to reset?
		application.info_region.reset();
		application.list_region.reset();
		application.nav_region.reset();
		application.user_region.reset();
		Backbone.history.navigate("#login", {trigger: true});
	});


	return application;
});
