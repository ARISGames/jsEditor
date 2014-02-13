define([
	'jquery',
	'underscore',
	'backbone',
	'models/amf_base',
	'models/content'
], function($, _, Backbone, AmfBaseModel, Content) {

	return AmfBaseModel.extend({
		idAttribute: 'node_id',


		initialize: function() {
			this.on("create", function(model) {
				var folder = new Content({content_id: model.get(model.idAttribute), content_type: "Node", game_id: model.get("game_id")});
				folder.save();
			});
		},


		amfphp_url_templates: {
			read:   "nodes.getNode",
			update: "nodes.updateNode",
			create: "nodes.createNode",
			delete: "nodes.deleteNode"
		},


		amfphp_url_attributes: [
			"game_id",
			"node_id",
			"title",
			"text",
			"media_id",
			"icon_media_id",
			"opt1_text",
			"opt1_node_id",
			"opt2_text",
			"opt2_node_id",
			"opt3_text",
			"opt3_node_id",
			"require_answer_string",
			"require_answer_incorrect_node_id",
			"require_answer_correct_node_id"
		],

		defaults: {
			title:  "",
			text:  "",
			media_id: 0,
			icon_media_id: 3,
			opt1_text: "",
			opt1_node_id: 0,
			opt2_text: "",
			opt2_node_id: 0,
			opt3_text: "",
			opt3_node_id: 0,
			require_answer_string: "",
			require_answer_incorrect_node_id: 0,
			require_answer_correct_node_id: 0
		}
	});
});
