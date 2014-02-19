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

	    // Bootstrap wrapper
		tagName: "table",
		className: "table",

		events: {
			"click .new": "onClickNew"
		},


		onClickNew: function() {
			Backbone.history.navigate("#games/"+this.collection.parent.get('game_id')+"/locations/new", {trigger: true});
		}
	});
});
