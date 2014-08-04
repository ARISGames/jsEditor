define([
	'models/json_base'
], function(JsonBaseModel) {

	return JsonBaseModel.extend({
		idAttribute: 'requirement_atom_id',

		amfphp_url_attributes: [
			"requirement_atom_id",
			"bool_operator",
			"requirement",
			"content_id",
			"qty",
			"latitude",
			"longitude"
		],

		defaults: {
			bool_operator:"0",
			requirement:"PLAYER_HAS_ITEM",
			content_id:"0",
			qty:"4",
			latitude:"86.75309",
			longitude:"3.141592"
		}

	});
});

