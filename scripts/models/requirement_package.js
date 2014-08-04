define([
	'models/json_base'
], function(JsonBaseModel) {

	return JsonBaseModel.extend({
		idAttribute: 'requirement_root_package_id',

		amfphp_url_templates: {
			read:   "requirements.getRequirementPackage",
			update: "requirements.updateRequirementPackage",
			create: "requirements.createRequirementPackage",
			delete: "requirements.deleteRequirementPackage"
		},

		amfphp_url_attributes: [
			"game_id",
			"requirement_root_package_id",
			"name",
		    "and_packages" // Nested attribute
        ],

		defaults: {
			name: "requirement package",
			and_packages: []
		}

	});
});

