define([
	'jquery',
	'underscore',
	'backbone',
	'models/character',
	'collections/row_collection_base',
	'vent'
], function($, _, Backbone, Character, RowCollectionBase, vent) {
	return RowCollectionBase.extend({

		model: Character,


		url: function() {
			return "http://arisgames.org/server/json.php/v1.npcs.getNpcs/"+this.parent.get('game_id');
		},
	});
});
