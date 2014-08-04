define([
	'models/json_base'
], function(JsonBaseModel) {

	return JsonBaseModel.extend({
		idAttribute: 'note_id',

		amfphp_url_attributes: [
			"note_id"
		],

		defaults: {
		}
	});
});

