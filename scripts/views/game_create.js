define([
	'underscore',
	'jquery',
	'backbone',
	'text!templates/game_create.tpl',
	'models/game',
	'vent'
], function(_, $, Backbone, Template, Game, vent) {

	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		className: "games-list-container",

		ui: {
			"name": "#game-name",
			"description": "#game-description"
		},

		onShow: function() {
			this.$el.find('input[autofocus]').focus();
		},

		events: {
			"click .save": "onClickSave",
			"click .cancel": "onClickCancel"
		},


		onClickSave: function() {
			var view = this;

			this.model.set("name",        this.ui.name.val());
			this.model.set("description", this.ui.description.val());

			this.model.save({}, {
				create: function() {
					Backbone.history.navigate("#games/"+view.model.get('game_id')+"/scenes", {trigger: true});
				}
			});
		},

		onClickCancel: function() {
			Backbone.history.navigate("#games", {trigger: true});
		}

	});
});

