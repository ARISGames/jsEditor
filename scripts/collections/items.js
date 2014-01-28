define([
	'jquery',
	'underscore',
	'backbone',
	'models/item',
	'collections/row_collection_base',
	'vent'
], function($, _, Backbone, Item, RowCollectionBase, vent) {
	return RowCollectionBase.extend({

		model: Item,


		url: function() {
			return "http://arisgames.org/server/json.php/v1.items.getItems/"+this.parent.get('game_id');
		},
	});
});
