// getConversationsWithNodeForNpc
//
define([
	'jquery',
	'underscore',
	'backbone',
	'models/conversation',
	'collections/row_collection_base',
	'vent'
], function($, _, Backbone, Conversation, RowCollectionBase, vent) {
	return RowCollectionBase.extend({

		model: Conversation,


		url: function() {
			return this.amfphp_url_root+'conversations.GetConversationsWithNodeForNpc/'+this.parent.get('game_id')+'/'+this.parent.get('npc_id');
		},
	});
});
