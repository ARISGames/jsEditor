define([
	'backbone',
	'text!templates/game_objects_organizer.tpl',
	'views/dialog_organizer',
	'views/plaque_organizer',
	'views/item_organizer',
	'views/web_page_organizer',
	'vent'
], function(Backbone, Template, DialogOrganizerView, PlaqueOrganizerView, ItemOrganizerView, WebPageOrganizerView, vent) {

	return Backbone.Marionette.Layout.extend({
		template: _.template(Template),

		regions: {
			dialogs_region: "#dialog-region",
			plaques_region: "#plaque-region",
			items_region:   "#item-region",
			pages_region:   "#page-region"
		},

		initialize: function(options) {
			this.dialog_collection = options.dialogs;
			this.plaque_collection = options.plaques;
			this.item_collection   = options.items;
			this.page_collection   = options.pages;
		},

		onShow: function() {
			this.dialogs_region.show(new DialogOrganizerView ({collection: this.dialog_collection}));
			this.plaques_region.show(new PlaqueOrganizerView ({collection: this.plaque_collection}));
			this.items_region.show  (new ItemOrganizerView   ({collection: this.item_collection  }));
			this.pages_region.show  (new WebPageOrganizerView({collection: this.page_collection  }));
		}
	});
});
