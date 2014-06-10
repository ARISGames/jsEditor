define([
	'underscore',
	'backbone',
	'text!templates/media_editor.tpl',
	'collections/media',
	'views/media_editor_thumbnail',
	'vent'
], function(_, Backbone, Template, MediaCollection, MediaThumbnailView, vent) {
	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		itemView: MediaThumbnailView,
		itemViewContainer: '.itemViewContainer',

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

		}

	});
});
