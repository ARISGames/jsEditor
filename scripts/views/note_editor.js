define([
	'underscore',
	'jquery',
	'backbone',
	'text!templates/note_editor.tpl',
	'collections/media',
	'collections/items',
	'models/game',
	'models/note',
	'views/media_chooser',
	'vent'
], function(_, $, Backbone, Template, MediaCollection, ItemsCollection, Game, Note, MediaChooserView, vent) {

	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		templateHelpers: function() {
			return {
				is_new: this.model.isNew(),

				url:  this.media.content()
			};
		},

		onShow: function() {
			this.$el.find('input[autofocus]').focus();
		},

		events: {
			"click .delete": "onClickDelete"
		},

		initialize: function(options) {
			this.media      = this.model.media();
		},

		onClickDelete: function() {
			this.model.destroy({
				success: function() {
					vent.trigger("application:popup:hide");
				}
			});
		},

		onRender: function() {
			this.switchMediaPreviewer();
		},

		switchMediaPreviewer: function() {
			this.$el.find('.media-previewer').hide();

			if     (this.media.is_video()) { this.$el.find('.video-preview').show(); }
			else if(this.media.is_audio()) { this.$el.find('.audio-preview').show(); }
			else                           { this.$el.find('.image-preview').show(); }
		}
	});
});
