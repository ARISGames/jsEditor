define([
	'underscore',
	'underscore.string',
	'backbone',
	'text!../../templates/edit_json_model.tpl',
	'i18n',
	'vent'
], function(_, _s, Backbone, Template, i18n, vent) {

	return Backbone.Marionette.ItemView.extend({
		template:  _.template(Template),

		templateHelpers: function() {
			return {
				model: this.model,
				gettext: i18n.gettext
			};
		},


		events: {
			"click #save":   "onClickSave",
			"click #delete": "onClickDelete"
		},


		onClickSave: function() {
			var view = this;

			// loop over attributes and set values from input ids.
			//
			_.each(this.model.editable_attributes(), function(attribute) {
				view.model.set(attribute, view.$el.find("#"+attribute).val());
			});

			this.model.save({}, {
				success: function() {
					Backbone.history.navigate('#games', {trigger: true});
				}
			});

			event.preventDefault();
		},


		onClickDelete: function() {
			if( confirm("Are you sure you want to delete this?") ) {
				this.model.destroy({
					success: function() {
						Backbone.history.navigate('#games', {trigger: true});
					}
				});
			}
		}
	});
});
