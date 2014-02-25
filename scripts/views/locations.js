define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'text!../../templates/locations.tpl',
	'collections/locations',
	'views/location_item',
	'views/edit_amf_model',
	'vent'
], function($, _, Backbone, Marionette, Template, LocationCollection, LocationItemView, EditAmfModelView, vent) {
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
					draggable: true,
					map: map,
					title: location.get('name')
				});


				// Info Window
				var info_window = new google.maps.InfoWindow({
					content: location.get('name')
				});

				google.maps.event.addListener(marker, 'mouseover', function() {
					info_window.open(map, marker);
				});

				google.maps.event.addListener(marker, 'mouseout', function() {
					info_window.close();
				});				


				// Double Click
				google.maps.event.addListener(marker, 'dblclick', function() {
					vent.trigger("application.show", new EditAmfModelView({model: location}));
					Backbone.history.navigate("#games/"+location.get('game_id')+"/locations/"+location.get('location_id')+"/edit", {trigger: false});
				});


				// Drag End
				google.maps.event.addListener(marker, 'dragend', function(event) {
					location.set('latitude',  event.latLng.lat());
					location.set('longitude', event.latLng.lng());
					location.save({}, {
						success: function() {
							// vent trigger location.update
							console.log("updated");
						}
					});
				});
			});

			// Fit map to all locations
			map.setCenter(boundary.getCenter());
			map.fitBounds(boundary);
		}
	});
});
