define([
	'jquery',
	'underscore',
	'backbone',
	'models/location',
	'collections/row_collection_base',
	'vent'
], function($, _, Backbone, Location, RowCollectionBase, vent) {
	return RowCollectionBase.extend({

		model: Location,


		url: function() {
			return this.amfphp_url_root+"locations.getLocationsWithQrCode/"+this.parent.get('game_id');
		},
	});
});
