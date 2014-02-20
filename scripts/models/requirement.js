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

		],
	});
});
