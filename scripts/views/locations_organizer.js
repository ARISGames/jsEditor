define([
	'backbone',
	'text!templates/locations_organizer.tpl',
	'views/locations_organizer_row',
	'vent'
], function(Backbone, Template, LocationsOrganizerRowView, vent) {

	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		itemView: LocationsOrganizerRowView,
		itemViewContainer: ".locations"
	});
});
