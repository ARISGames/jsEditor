define([
	'jquery',
	'underscore',
	'backbone',
	'models/amf_base',
	'models/content'
], function($, _, Backbone, AmfBaseModel, Content) {

	return AmfBaseModel.extend({
		idAttribute: 'requirement_id',


		amfphp_url_templates: {
			read:   "requirements.getRequirement",
			update: "requirements.updateRequirement",
			create: "requirements.createRequirement",
			delete: "requirements.deleteRequirement"
		},


		amfphp_url_attributes: [
			"game_id",
			"requirement_id",
			"content_type",
			"content_id",
			"requirement",
			"requirement_detail_1",
			"requirement_detail_2",
			"requirement_detail_3",
			"requirement_detail_4",
			"boolean_operator",
			"not_operator"
		],

		defaults: {
          boolean_operator: "AND",
          content_id: "",
          content_type: "",
          group_operator: "SELF",
          not_operator: "DO",
          requirement: "PLAYER_HAS_ITEM",
          requirement_detail_1: "",
          requirement_detail_2: "1",
          requirement_detail_3: "",
          requirement_detail_4: ""
		}
	});
});
