define([
	'underscore',
	'backbone',
	'text!../../templates/plaques.tpl',
	'collections/plaques',
	'views/plaque_item',
], function(_, Backbone, Template, PlaqueCollection, PlaqueItemView) {
	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		itemView: PlaqueItemView,

		// TODO move these into template and add itemViewContainer
	    // Bootstrap wrapper
		tagName: "table",
		className: "table",


		events: {
			"click .new": "onClickNew"
		},


		onClickNew: function() {
			Backbone.history.navigate("#games/"+this.collection.parent.get('game_id')+"/plaques/new", {trigger: true});
		}
	});
});
