define([
	'models/json_base'
], function(JsonBaseModel) {

	return JsonBaseModel.extend({
		idAttribute: 'tag_id',

		amfphp_url_attributes: [
			"tag_id"
		],

		defaults: {
		}
	});
});

