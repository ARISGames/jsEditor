define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/conversation_row.tpl',
	'views/script_editor',
	'models/media',
	'models/game',
	'collections/dialog_scripts',
	'collections/dialog_options',
	'vent'
], function($, _, Backbone, Template, ScriptEditorView, Media, Game, DialogScriptsCollection, DialogOptionsCollection, vent) {
	return Backbone.Marionette.ItemView.extend({
		template: _.template(Template),

		// Bootstrap
		tagName: 'a',
		className: "list-group-item",

		events: {
			"click .edit": "onClickEdit"
		},

		modelEvents: {
			"change": "render"
		},

		onClickEdit: function() {
			var game = new Game({game_id: this.model.get("game_id")});

			var scripts = new DialogScriptsCollection([], {parent: this.model, game: game});
			var options = new DialogOptionsCollection([], {parent: this.model, game: game});

			$.when(scripts.fetch(), options.fetch()).done(function()
			{
				// Wire up children
				scripts.each(function(script) {
					var script_options = options.where({parent_dialog_script_id: script.id});
					script.set("dialog_options", new DialogOptionsCollection(script_options));
				});

				var conversations_editor = new ScriptEditorView({collection: scripts, dialog: this.model, script_options: options});
				vent.trigger("application:popup:show", conversations_editor, "Edit Conversation Script");

			}.bind(this));
		}

	});
});
