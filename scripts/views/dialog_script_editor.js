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

		templateHelpers: function() {
			return {
				is_new: this.model.isNew(),

				option_selected: function(boolean_statement) {
					return boolean_statement ? "selected" : "";
				},

				characters: this.characters
			}
		},


		initialize: function(options) {
			this.characters = options.characters;
			this.scripts = options.scripts;
			this.script_options = options.script_options;
			this.instance_parent_option = options.instance_parent_option;

			this.previous_attributes = _.clone(this.model.attributes)
		},


		ui: {
			text: ".text",
			character: ".character"
		},


		events: {
			"change @ui.text":      "onChangeText",
			"change @ui.character": "onChangeCharacter",
			"click .save":          "onClickSave",
			"click .cancel":        "onClickCancel",
			"click .edit-events":   "onClickEditEvents",
			"click .delete-this":   "onClickDeleteThis",
			"click .delete-all":    "onClickDeleteAll",
		},

		onChangeText: function() {
			this.model.set("text", this.ui.text.val());
		},

		onChangeCharacter: function() {
			var value = this.ui.character.find("option:selected").val();
			this.model.set("dialog_character_id", value);
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
		},

		onClickDeleteThis: function() {
			if(!this.instance_parent_option) return;
			this.script_options.remove(this.instance_parent_option);
			this.instance_parent_option.destroy({
				success: function() {
					vent.trigger("conversation:update");
					vent.trigger("application:info:hide");
				}
			});
		},

		onClickDeleteAll: function() {
			var child_options = this.script_options.where({parent_dialog_script_id:this.model.get("dialog_script_id")});
			for(var i = 0; i < child_options.length; i++)
			{
				this.script_options.remove(child_options[i]);
				child_options[i].destroy();
			}

			var parent_options = this.script_options.where({link_type:"DIALOG_SCRIPT", link_id:this.model.get("dialog_script_id")});
			for(var i = 0; i < parent_options.length; i++) //should actually only be one
			{
				this.script_options.remove(parent_options[i]);
				parent_options[i].destroy();
			}

			this.scripts.remove(this.model);
			this.model.destroy({
				success: function() {
					vent.trigger("conversation:update");
					vent.trigger("application:info:hide");
				}
			});
		}

	});
});
