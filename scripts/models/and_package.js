define([
	'models/json_base'
], function(JsonBaseModel) {

	return JsonBaseModel.extend({
		idAttribute: 'requirement_and_package_id',

		amfphp_url_attributes: [
			"requirement_and_package_id",
			"atoms"
        ],

		defaults: {
			atoms: []
		}

	});
});

