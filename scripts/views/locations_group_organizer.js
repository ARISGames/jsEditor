define([
       'backbone',
       'text!templates/locations_group_organizer.tpl',
       'views/locations_organizer_row',
       'vent'
], function(Backbone, Template, LocationsOrganizerRowView, vent) {

       return Backbone.Marionette.CompositeView.extend({
			template: _.template(Template),

			templateHelpers: function() {
				return {
					object_icon: this.object_icon,
	   				title: this.title
				}
			},

			itemView: LocationsOrganizerRowView,
			itemViewContainer: ".locations",

	   		initialize: function(options) {
				this.object_icon = options.object_icon;
				this.title = options.title;
			}
       });
});
