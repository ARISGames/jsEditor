define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'text!../../templates/items.tpl',
	'collections/items',
	'views/item_item',
], function($, _, Backbone, Marionette, Template, ItemCollection, ItemItemView) {
	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		itemView: ItemItemView,

	    // Bootstrap wrapper
		tagName: "table",
		className: "table",

		events: {
			"click .new": "onClickNew"
		},


		onClickNew: function() {
			Backbone.history.navigate("#games/"+this.collection.parent.get('game_id')+"/items/new", {trigger: true});
		}
	});
});
