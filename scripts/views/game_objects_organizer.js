define([
	'backbone',
	'text!templates/game_objects_organizer.tpl',
	'views/dialog_organizer',
	'vent'
], function(Backbone, Template, DialogOrganizerView, vent) {

	return Backbone.Marionette.Layout.extend({
		template: _.template(Template),

		regions: {
			dialogs_region: "#dialog-region",
			plaques_region: "#plaque-region",
			items_region:   "#item-region"
		},

		initialize: function(options) {
			this.dialog_collection = options.dialogs;
		},

		onShow: function() {
			this.dialogs_region.show(new DialogOrganizerView({collection: this.dialog_collection}));
		}
	});
});
