define([
	'underscore',
	'backbone',
	'text!../../templates/game_editor.tpl',
	'vent'
], function(_, Backbone, Template, vent) {

	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		templateHelpers: function() {
			return {
				is_new : this.model.isNew()
			}
		},

		events: {
			"click .save": "onClickSave",
			"click .cancel": "onClickCancel"
		},

		onClickSave: function() {
			var view = this;

			this.model.set("name",        this.$el.find("#game-name").val());
			this.model.set("description", this.$el.find("#game-description").val());

			this.model.save({}, {
				create: function() {
					Backbone.history.navigate("#games/"+view.model.get('game_id')+"/scenes", {trigger: true});
				},

				update: function() {
					Backbone.history.navigate("#games/"+view.model.get('game_id')+"/scenes", {trigger: true});
				}
			});
		},

		onClickCancel: function() {
			if(this.model.isNew()) {
				Backbone.history.navigate("#games", {trigger: true});
			}
			else {
				Backbone.history.navigate("#games/"+this.model.get('game_id')+"/scenes", {trigger: true});
			}
		}

	});
});

