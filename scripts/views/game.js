define([
	'module',
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'models/session',
	'text!../../templates/game.tpl',
], function(module, $, _, Backbone, Marionette, Session, Template) {
    console.log(module.id);

	return Backbone.Marionette.ItemView.extend({
		template:  _.template(Template),
	
		events: {
			"click #save": "onClickSave"
		},

		onClickSave: function() {
			// TODO mass assign attributes from form serialize?
			//
			this.model.set("name", this.$el.find("#name").val());
			this.model.save();

			event.preventDefault();
		}
	});
});
