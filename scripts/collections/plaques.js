define([
	'jquery',
	'underscore',
	'backbone',
	'models/plaque',
	'collections/row_collection_base',
	'vent'
], function($, _, Backbone, Plaque, RowCollectionBase, vent) {
	return RowCollectionBase.extend({

		model: Plaque,


		url: function() {
			return this.amfphp_url_root+"nodes.getNodes/"+this.parent.get('game_id');
		},
	});
});
