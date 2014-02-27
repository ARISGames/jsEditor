define([
	'module',
	'jquery',
	'underscore',
	'underscore.string',
	'backbone',
	'marionette',
	'text!../../templates/upload_media.tpl',
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
			"click #save":   "onClickSave",
			"click #delete": "onClickDelete"
		},


		onClickSave: function() {
			event.preventDefault();

			var form_data = new FormData(this.$el.find('#file_form').get(0));

			$.ajax({
				url: "https://arisgames.org/services/v1/uploadHandler.php",
				data: form_data,
				type: 'POST',
				processData: false,
				success: function(data) {
					console.log("uploadHandle Response", data);
				}
			});

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
