define([
	'jquery',
	'underscore',
	'backbone',
	'models/quest',
	'collections/row_collection_base',
	'vent'
], function($, _, Backbone, Quest, RowCollectionBase, vent) {
	return RowCollectionBase.extend({

		model: Quest,


		url: function() {
			return this.amfphp_url_root+"quests.getQuests/"+this.parent.get('game_id');
		},
	});
});
