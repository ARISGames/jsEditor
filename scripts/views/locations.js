define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'text!../../templates/locations.tpl',
	'collections/locations',
	'views/location_item',
], function($, _, Backbone, Marionette, Template, LocationCollection, LocationItemView) {
	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		itemView: LocationItemView,
		itemViewContainer: ".itemViewContainer",
	

		events: {
			"click .new": "onClickNew"
		},


		onClickNew: function() {
			Backbone.history.navigate("#games/"+this.collection.parent.get('game_id')+"/locations/new", {trigger: true});
		},


		onRender: function() {
			// Render Map
			var element = this.$el.find('.map-canvas').get(0);

			var map_options = {
				zoom: 8,
				center: new google.maps.LatLng(-34.397, 150.644)
			};
			var map = new google.maps.Map(element, map_options);
			var boundary = new google.maps.LatLngBounds();

			// Add Locations to map
			_.each(this.collection.models, function(location) {
				var location_position = new google.maps.LatLng(location.get('latitude'), location.get('longitude'));

				// Extend boundary with all locations
				boundary.extend(location_position);

				var marker = new google.maps.Marker({
					position: location_position,
					map: map,
					title: location.get('name')
				});
			});

			// Fit map to all locations
			map.setCenter(boundary.getCenter());
			map.fitBounds(boundary);
		}
	});
});
