define([
	'models/json_base',
	'models/dialog'
], function(JsonBaseModel, Dialog) {

	return JsonBaseModel.extend({
		idAttribute: 'instance_id',

		amfphp_url_templates: {
			read:   "instances.getInstance",
			update: "instances.updateInstance",
			create: "instances.createInstance",
			delete: "instances.deleteInstance"
		},

		amfphp_url_attributes: [
			"instance_id",
			"game_id",
			"object_id",
			"object_type"
        ],

		type_for: function(object) {
			if(object instanceof Dialog) { return "DIALOG" }
			else { throw "cant determine type of: " + object }
		}
	});
});
