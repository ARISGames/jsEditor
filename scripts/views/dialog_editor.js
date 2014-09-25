define([
	'underscore',
	'jquery',
	'backbone',
	'text!templates/dialog_editor.tpl',
	'collections/characters',
	'collections/media',
	'collections/dialog_scripts',
	'collections/dialog_options',
	'collections/plaques',
	'collections/items',
	'collections/web_pages',
	'collections/dialogs',
	'collections/tabs',
	'models/media',
	'models/game',
	'models/character',
	'models/dialog_script',
	'models/dialog_option',
	'views/media_chooser',
	'views/conversation_editor',
	'views/character_organizer',
	'vent'
], function(_, $, Backbone, Template,
	CharactersCollection, MediaCollection, DialogScriptsCollection, DialogOptionsCollection, PlaquesCollection, ItemsCollection, WebPagesCollection, DialogsCollection, TabsCollection,
	Media, Game, Character, DialogScript, DialogOption,
	MediaChooserView, ConversationEditorView, CharactersOrganizerView,
	vent) {

	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		templateHelpers: function() {
			return {
				is_new: this.model.isNew(),
				icon_thumbnail_url: this.icon.thumbnail()
			}
		},


		ui: {
			"name": "#dialog-name",
			"description": "#dialog-description",
			"iconchooser": "#icon-chooser-container"
		},

		onShow: function() {
			this.$el.find('input[autofocus]').focus();
		},


		events: {
			"click .save": "onClickSave",
			"click .change-icon": "onClickChangeIcon",
			"click .edit-script": "onClickEditConversation"
		},

		initialize: function(options) {
			this.icon = options.icon;
		},

		onClickSave: function() {
			var view   = this;
			var dialog = this.model;

			// Save Object
			dialog.set("icon_media_id", view.icon.get("media_id"));
			dialog.set("name",          view.ui.name.val());
			dialog.set("description",   view.ui.description.val());

			dialog.save({}, {
				create: function() {
					vent.trigger("dialog:add", dialog);
					vent.trigger("application:popup:hide");
				},

				update: function()
				{
					// FIXME get rid of global update broadcasts for models
					vent.trigger("game_object:update", dialog);
					vent.trigger("application:popup:hide");
				}
			});
		},

		onClickChangeIcon: function() {
			var view = this;

			var game  = new Game({game_id: this.model.get("game_id")});
			var media = new MediaCollection([], {parent: game});

			media.fetch({
				success: function() {
					/* Icon */
					var icon_chooser = new MediaChooserView({collection: media});

					icon_chooser.on("media:choose", function(media) {
						view.icon = media;
						view.model.set("icon_media_id", media.id);
						vent.trigger("application:popup:show", view, "Edit Conversation");
					});

					icon_chooser.on("cancel", function() {
						vent.trigger("application:popup:show", view, "Edit Conversation");
					});

					vent.trigger("application:popup:show", icon_chooser, "Choose Icon");
				}
			});
		},

		onClickEditConversation: function() {
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
				vent.trigger("application:info:hide");

				// FIXME hack to launch editor

				Backbone.history.navigate("#games/"+this.model.get('game_id')+"/conversations");
				vent.trigger("application:active_nav", ".conversations");
				vent.trigger("application:popup:hide");

			}.bind(this));
		}
	});
});
