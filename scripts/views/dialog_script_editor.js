define([
	'underscore',
	'backbone',
	'text!templates/dialog_script_editor.tpl',

	'collections/events',
	'collections/items',
	'models/event_package',
	'models/game',
	'views/events',
	'vent'
], function(_, Backbone, Template,
	EventsCollection,
	ItemsCollection,
	EventPackage,
	Game,
	EventsEditorView,
	vent) {
	return Backbone.Marionette.ItemView.extend({

		template: _.template(Template),


		initialize: function(options) {
			this.previous_attributes = _.clone(this.model.attributes)
		},


		templateHelpers: function() {
			return {
				is_new: this.model.isNew(),

				option_selected: function(boolean_statement) {
					return boolean_statement ? "selected" : "";
				}
			}
		},

		ui: {
			text: ".text"
		},

		events: {
			"change @ui.text":    "onChangeText",
			"click .save":        "onClickSave",
			"click .cancel":      "onClickCancel",
			"click .edit-events": "onClickEditEvents",
		},


		onChangeText: function() {
			this.model.set("text", this.ui.text.val());
		},

		onClickSave: function() {
			this.model.save({}, {
				success: function() {
					vent.trigger("conversation:update");
					vent.trigger("application:info:hide");
				}
			});
		},

		onClickCancel: function() {
			this.model.set(this.previous_attributes);
			vent.trigger("application:info:hide");
		},

		onClickEditEvents: function() {
			var view = this;

			var event_package = new EventPackage({event_package_id: view.model.get("event_package_id"), game_id: view.model.get("game_id")});
			var events = new EventsCollection([], {parent: event_package});

			var game   = new Game({game_id: view.model.get("game_id")});
			var items  = new ItemsCollection([], {parent: game});

			$.when(items.fetch(), events.fetch()).done(function() {

				// launch editor
				var events_editor = new EventsEditorView({model: event_package, collection: events, items: items});

				events_editor.on("cancel", function()
				{
					vent.trigger("application:popup:hide");
				});

				events_editor.on("event_package:save", function(event_package)
				{
					view.model.set("event_package_id", event_package.id);
					vent.trigger("application:popup:hide");
				});

				vent.trigger("application:popup:show", events_editor, "Player Modifier");
			});
		}
	});
});
