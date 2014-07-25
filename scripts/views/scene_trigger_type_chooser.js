define([
	'underscore',
	'backbone',
	'text!templates/scene_trigger_type_chooser.tpl',
	'views/dialog_chooser',
	'views/scene_instance_trigger',
	'collections/dialogs',
	'vent'
], function(_, Backbone, Template, DialogChooserView, SceneInstanceTriggerView, DialogsCollection, vent) {
	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		events: {
			"click .add-dialog": "onClickAddDialog",
			"click .add-item":   "onClickAddItem"
		},

		initialize: function(options) {
			this.game = options.game;
		},

		onClickAddDialog: function() {
			var scene = this.model;

			var dialogs = new DialogsCollection([], {parent: this.game});

			dialogs.fetch({
				success: function() {
					var dialog_chooser = new DialogChooserView({collection: dialogs, parent: scene});
					vent.trigger("application:popup:show", dialog_chooser, "Add Dialog to Scene");
				}
			});
		},

		onClickAddItem: function() {
			var scene = this.model;

			var items = new ItemsCollection([], {parent: this.game});

			items.fetch({
				success: function() {
					var item_chooser = new ItemChooserView({collection: items, parent: scene});
					vent.trigger("application:popup:show", item_chooser, "Add Item to Scene");
				}
			});
		}
	});
});
