define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/conversation_row.tpl',
	'views/script_editor',
	'models/media',
	'models/game',
	'models/character',
	'models/dialog_script',
	'collections/characters',
	'collections/media',
	'collections/dialog_scripts',
	'collections/dialog_options',
	'vent'
], function($, _, Backbone, Template, ScriptEditorView, Media, Game, Character, DialogScript, CharactersCollection, MediaCollection, DialogScriptsCollection, DialogOptionsCollection, vent) {
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

			var dialog     = this.model;
			var characters = new CharactersCollection   ([], {parent: game});
			var media      = new MediaCollection        ([], {parent: game});
			var scripts    = new DialogScriptsCollection([], {parent: dialog, game: game});
			var options    = new DialogOptionsCollection([], {parent: dialog, game: game});

			$.when(characters.fetch(), media.fetch(), scripts.fetch(), options.fetch()).done(function()
			{

				// FIXME Load in null script like client does until migration is changed
				if(dialog.get("intro_dialog_script_id") === "0")
				{
					var intro_script = new DialogScript({dialog_script_id: "0"});
					scripts.add(intro_script);
				}
				else
				{
					var intro_script = scripts.findWhere({dialog_script_id: dialog.get("intro_dialog_script_id")});
				}


				// Wire up children, characters, and media
				scripts.each(function(script)
				{
					// Prevent recursive rendering
					script.set("rendered", false);

					var script_options = options.where({parent_dialog_script_id: script.id});
					script.set("dialog_options", new DialogOptionsCollection(script_options));

					// "YOU"
					if(script.get("dialog_character_id") === "0")
					{
						var character = new Character({name: "You"})
					}
					else
					{
						var character = characters.findWhere({dialog_character_id: script.get("dialog_character_id")});
					}

					script.set("character", character);


					// Default Media
					if(character.get("media_id") === "0")
					{
						var character_media = new Media({media_id: "0"});
					}
					else
					{
						var character_media = media.findWhere({media_id: character.get("media_id")});
					}

					character.set("media", character_media);
				});


				var conversations_editor = new ScriptEditorView({model: intro_script, collection: intro_script.get("dialog_options"), dialog: dialog, scripts: scripts, script_options: options, className: "intro_script"});
				vent.trigger("application:popup:show", conversations_editor, "Edit Conversation Script", true);

			}.bind(this));
		}

	});
});
