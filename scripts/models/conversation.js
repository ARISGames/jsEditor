define([
	'jquery',
	'underscore',
	'backbone',
	'models/amf_base',
	'models/content'
], function($, _, Backbone, AmfBaseModel, Content) {

	return AmfBaseModel.extend({
		idAttribute: 'conversation_id',

		amfphp_url_templates: {
			read:   null,
			update: "conversations.updateConversationWithNode",
			create: "conversations.createConversationWithNode",
			delete: "conversations.deleteConversationWithNode"
		},


		amfphp_url_attributes: function() {
			if(this.isNew())
			{
				return [
					"game_id",
					"dialog_id",
					"conversation_text",
					"text",
					"index"
				];
			}
			else
			{
				return [
					"game_id",
					"conversation_id",
					"conversation_text",
					"text",
					"index"
				];

			}
		},


		defaults: {
			conversation_text: "",
			text: "",
			index: 0
		}
	});
});
