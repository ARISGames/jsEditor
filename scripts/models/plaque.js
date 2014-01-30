define([
	'jquery',
	'underscore',
	'backbone',
	'models/amf_base',
	'models/session'
], function($, _, Backbone, AmfBaseModel, Session) {

	return AmfBaseModel.extend({
		idAttribute: 'node_id',

		amfphp_url_templates: {
			read:   _.template("http://arisgames.org/server/json.php/v1.nodes.getNode/<%= game_id %>/<%= node_id %>"),
			update: _.template("http://arisgames.org/server/json.php/v1.nodes.updateNode/<%= model_attributes_url %>/<%= editor_id %>/<%= editor_token %>"),
			create: _.template("http://arisgames.org/server/json.php/v1.nodes.createNode/<%= model_attributes_url %>/<%= editor_id %>/<%= editor_token %>")
		},


		// attribute order for url here
		// TODO seems a bit clever, a long template list might bet better ie {game_id}/{name}/{description}?
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
