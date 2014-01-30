define([
	'module',
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'text!../../templates/edit_plaque.tpl',
	'vent'
], function(module, $, _, Backbone, Marionette, Template, vent) {
    console.log(module.id);

	return Backbone.Marionette.ItemView.extend({
		template:  _.template(Template),
	
		events: {
			"click #save": "onClickSave"
		},


		onClickSave: function() {
			var self = this;

			this.model.set("title", this.$el.find("#title").val());
			this.model.set("text",  this.$el.find("#text").val());
			this.model.save({}, {
				success: function() {
					Backbone.history.navigate('#games/'+self.model.get('game_id')+'/plaques', {trigger: true});
				}
			});

			event.preventDefault();
		}
	});
});
