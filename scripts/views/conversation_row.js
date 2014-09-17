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
], function($, _, Backbone, Template,
		ConversationEditorView, CharactersOrganizerView,
		Media, Game, Character, DialogScript, DialogOption,
		CharactersCollection, MediaCollection, DialogScriptsCollection, DialogOptionsCollection, PlaquesCollection, ItemsCollection, WebPagesCollection, DialogsCollection, TabsCollection,
		vent) {
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

				//add 'null' character
				var character = new Character({name: "You", dialog_character_id: "0", title: "The Player"})
				characters.unshift(character);

				//add 'null' media
				var character_media = new Media({media_id: "0"});
				media.push(character_media);

				var conversations_editor = new ConversationEditorView(
					{
						model: intro_script,
						dialog: dialog,
						characters: characters,
						media: media,
						scripts: scripts,
						script_options: options,
						contents: contents,
						game: game
					});
				vent.trigger("application.show", conversations_editor, "Edit Conversation Script", true);
				vent.trigger("application:list:show", new CharactersOrganizerView({collection: characters, model: game}));

			}.bind(this));
		}

	});
});
