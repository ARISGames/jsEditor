define([
	'underscore',
	'backbone',
	'text!templates/media_editor.tpl',
	'collections/media',
	'models/media',
	'views/media_editor_thumbnail',
	'views/media_upload',
	'vent'
], function(_, Backbone, Template, MediaCollection, Media, MediaThumbnailView, MediaUploadView, vent) {
	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		itemView: MediaThumbnailView,
		itemViewContainer: '.itemViewContainer',

		className: 'media-editor',

		events: {
			"click .upload": "onClickUpload"
		},

		initialize: function() {
			var view = this;
			vent.on("media:upload", function(media) {
				view.collection.add(media);
			});
		},

		onClickUpload: function() {
			var media = new Media({game_id: this.model.get("game_id")});
			vent.trigger("application:dialog:show", new MediaUploadView({model: media}), "Upload Media");
		}
	});
});
