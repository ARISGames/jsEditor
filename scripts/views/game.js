define([
	'module',
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'text!../../templates/game.tpl',
], function(module, $, _, Backbone, Marionette, Template) {
    console.log(module.id);

	return Backbone.Marionette.ItemView.extend({
		template:  _.template(Template),
	
		events: {
			"click #save": "onClickSave"
		},

		onClickSave: function() {
			// TODO mass assign attributes from form serialize/or a whitelist of attributes
			//
			this.model.set("name", this.$el.find("#name").val());
			this.model.set("description", this.$el.find("#description").val());
			this.model.save();

			event.preventDefault();
		}
	});
});
