define([
  'views/editor_collection_base',
  'underscore',
  'text!templates/conversations.tpl',
  'vent',
  'storage',
  'views/conversation_row',
  'views/dialog_creator',
  'views/conversation_editor',
  'views/character_organizer',
  'models/dialog',
  'models/media',
  'models/character',
  'collections/characters',
  'collections/media',
  'collections/dialog_scripts',
  'collections/dialog_options',
  'collections/plaques',
  'collections/items',
  'collections/web_pages',
  'collections/dialogs',
  'collections/tabs',
],
function(
  EditorCollectionView,
  _,
  Template,
  vent,
  storage,
  ConversationRowView,
  DialogCreatorView,
  ConversationEditorView,
  CharactersOrganizerView,
  Dialog,
  Media,
  Character,
  CharactersCollection,
  MediaCollection,
  DialogScriptsCollection,
  DialogOptionsCollection,
  PlaquesCollection,
  ItemsCollection,
  WebPagesCollection,
  DialogsCollection,
  TabsCollection
)
{
  return EditorCollectionView.extend(
  {
    template: _.template(Template),

    itemView: ConversationRowView,
    itemViewContainer: '.conversations',

    className: 'conversations-editor',

    events: {
      "click .new": "onClickNew"
    },

    onClickNew: function() {
      // Prompt for name

      var view = this;

      var dialog = new Dialog({game_id: this.model.get("game_id")});
      var dialog_creator = new DialogCreatorView({model: dialog});
      vent.trigger("application:popup:show", dialog_creator, "Create Conversation");

      dialog_creator.on("dialog:create", function() {
        view.editConversation(dialog);
      });
    },

    editConversation: function(dialog) {
      var game = this.model;

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

        // TODO remove once we preload all objects in a controller/router
        storage.media.add(media.models);

        var conversations_editor = new ConversationEditorView(
          {
            model: intro_script,
            dialog: dialog,
            characters: characters,
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

