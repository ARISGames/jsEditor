define([
  'views/editor_collection_base',
  'underscore',
  'text!templates/conversations.tpl',
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
  'storage',
  'vent',
],
function(
  EditorCollectionView,
  _,
  Template,
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
  TabsCollection,
  storage,
  vent
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

    onClickNew: function()
    {
      // Prompt for name

      var view = this;

      var dialog = new Dialog({game_id: this.model.get("game_id")});
      var dialog_creator = new DialogCreatorView({model: dialog});
      vent.trigger("application:popup:show", dialog_creator, "Create Conversation");

      dialog_creator.on("dialog:create", function()
      {
        view.editConversation(dialog);
      });
    },

    editConversation: function(dialog)
    {
      var self = this;
      var game = this.model;

      var scripts = new DialogScriptsCollection([], {parent: dialog, game: game});
      var options = new DialogOptionsCollection([], {parent: dialog, game: game});

      // FIXME Load in null script like client does until migration is changed
      var intro_script = scripts.findWhere({dialog_script_id: dialog.get("intro_dialog_script_id")});

      //add 'null' character
      var character = new Character({name: "You", dialog_character_id: "0", title: "The Player"})
      storage.dialog_characters.unshift(character);

      //add 'null' media
      var character_media = new Media({media_id: "0"});
      storage.media.push(character_media);

      var conversations_editor = new ConversationEditorView(
        {
          model: intro_script,
          dialog: dialog,
          my_scripts: scripts,
          my_options: options,
        });
      vent.trigger("application.show", conversations_editor, "Edit Conversation Script", true);
      vent.trigger("application:list:show", new CharactersOrganizerView({collection:storage.dialog_characters, model: game}));
    }
  });
});

