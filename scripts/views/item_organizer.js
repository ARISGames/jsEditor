define([
       'backbone',
       'text!templates/item_organizer.tpl',
       'views/item_organizer_row',
	   'views/item_editor',
	   'models/item',
	   'models/media',
       'vent'
], function(Backbone, Template, ItemOrganizerRowView, ItemEditorView, Item, Media, vent) {

	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		itemView: ItemOrganizerRowView,
		itemViewContainer: ".items",


		initialize: function(options) {
			var view = this;

			vent.on("game_object:add", function(game_object) {
				if(game_object instanceof Item)
				{
					view.collection.add(game_object);
				}
			});
		},


		events: {
			"click .new": "onClickNew"
		},


		onClickNew: function() {
			var item  = new Item({game_id: this.model.get("game_id")});

			var item_editor = new ItemEditorView({model: item});
			vent.trigger("application:popup:show", item_editor, "Create Item");
		}
	});
});
