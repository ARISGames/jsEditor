define([
	'backbone',
	'text!templates/media_organizer.tpl',
	'views/media_organizer_row',
	'vent'
], function(Backbone, Template, MediaOrganizerRowView, vent) {

	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		itemView: MediaOrganizerRowView,
		itemViewContainer: ".media",

		className: 'media-organizer',

		initialize: function() {
			var view = this;
			vent.on("media:upload", function(media) {
				view.collection.add(media);
			});
		}
	});
});
