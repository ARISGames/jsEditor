define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/conversation_row.tpl',
	'views/conversation_editor',
	'views/character_organizer',
	'models/media',
	'models/game',
	'models/character',
	'models/dialog_script',
	'models/dialog_option',
	'collections/characters',
	'collections/media',
	'collections/dialog_scripts',
	'collections/dialog_options',
	'collections/plaques',
	'collections/items',
	'collections/web_pages',
	'collections/dialogs',
	'collections/tabs',
	'vent'
], function($, _, Backbone, Template, ConversationEditorView, CharactersOrganizerView, Media, Game, Character, DialogScript, DialogOption, CharactersCollection, MediaCollection, DialogScriptsCollection, DialogOptionsCollection, PlaquesCollection, ItemsCollection, WebPagesCollection, DialogsCollection, TabsCollection, vent) {
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


			var contents = {
				plaques:    new PlaquesCollection  ([], {parent: game}),
				items:      new ItemsCollection    ([], {parent: game}),
				web_pages:  new WebPagesCollection ([], {parent: game}),
				dialogs:    new DialogsCollection  ([], {parent: game}),
				tabs:       new TabsCollection     ([], {parent: game})
			};

			$.when(characters.fetch(), media.fetch(), scripts.fetch(), options.fetch(), contents.plaques.fetch(), contents.items.fetch(), contents.web_pages.fetch(), contents.dialogs.fetch(), contents.tabs.fetch()).done(function()
			{

				// FIXME Load in null script like client does until migration is changed
				var intro_script = scripts.findWhere({dialog_script_id: dialog.get("intro_dialog_script_id")});

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

				if(intro_script) {
					var intro_script_options = intro_script.get("dialog_options");
				}

				var conversations_editor = new ConversationEditorView({model: intro_script, collection: intro_script_options, dialog: dialog, scripts: scripts, script_options: options, contents: contents, game: game});
				vent.trigger("application.show", conversations_editor, "Edit Conversation Script", true);
				vent.trigger("application:list:show", new CharactersOrganizerView({collection: characters}));

			}.bind(this));
		}

	});
});
