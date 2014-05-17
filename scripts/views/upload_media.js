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

			var form_data = new FormData()

			form_data.append('file',   this.$el.find('#file_data').get(0).files[0]);
			form_data.append('gameID', this.model.get('game_id'));

			var name = this.$el.find('#file_name').val();
			var media = this.model;

			$.ajax({
				url: "https://arisgames.org/server/services/v1/uploadHandler.php",
				data: form_data,
				type: 'POST',
				processData: false,
				contentType: false,
				success: function(data) {

					media.set('name',      name);
					media.set('file_name', data);

					media.save({
						success: function() {
							Backbone.history.navigate('#games', {trigger: true});
						}
					});
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
