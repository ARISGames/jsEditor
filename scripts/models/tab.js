define([
	'models/json_base'
], function(JsonBaseModel) {

	return JsonBaseModel.extend({
		idAttribute: 'tab_id',

		amfphp_url_attributes: [
			"tab_id"
		],

		defaults: {
		}
	});
});

