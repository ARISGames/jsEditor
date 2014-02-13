define([
	'module',
	'jquery',
	'underscore',
	'underscore.string',
	'backbone',
	'marionette',
	'text!../../templates/edit_amf_model.tpl',
	'i18n!../locale/nls/form.js',
	'vent'
], function(module, $, _, _s, Backbone, Marionette, Template, translation, vent) {
    console.log(module.id);

	return Backbone.Marionette.ItemView.extend({
		template:  _.template(Template),

		templateHelpers: function() {
			return {
				model: this.model,
				    t: translation
			};
		},


		events: {
			"click #save": "onClickSave"
		},


		onClickSave: function() {
			var self = this;

			// loop over attributes and set values from input ids.
			//
			this.model.set("name",        this.$el.find("#name").val());

			this.model.save({}, {
				success: function() {
					Backbone.history.navigate('#games/'+self.model.get('game_id')+'/characters', {trigger: true});
				}
			});

			event.preventDefault();
		}
	});
});
