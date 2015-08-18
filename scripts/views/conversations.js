define([
  'views/editor_collection_base',
  'underscore',
  'text!templates/conversations.tpl',
  'vent',
  'storage',
  'views/conversation_row',
  'views/conversation_creator',
  'views/conversation_editor',
  'views/character_organizer',
  'models/media',
  'newfangled/dialogs_model',
  'newfangled/dialog_characters_model',
  'newfangled/dialog_scripts_model',
  'newfangled/dialog_options_model',
  'collections/media',
  'collections/plaques',
  'collections/items',
  'collections/web_pages',
  'collections/tabs',
],
function(
  EditorCollectionView,
  _,
  Template,
  vent,
  storage,
  ConversationRowView,
  ConversationCreatorView,
  ConversationEditorView,
  CharactersOrganizerView,
  Media,
  DialogsModel,
  DialogCharactersModel,
  DialogScriptsModel,
  DialogOptionsModel,
  Character,
  CharactersCollection,
  MediaCollection,
  PlaquesCollection,
  ItemsCollection,
  WebPagesCollection,
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

    onClickNew: function()
    {
      var self = this;

      var dialog = DialogsModel.genMember();
      dialog.game_id = self.model.get("game_id");

      var conversation_creator = new ConversationCreatorView({model:dialog});
      vent.trigger("application:popup:show", conversation_creator, "Create Conversation");

      conversation_creator.on("dialog:create", function()
      {
        self.editConversation(dialog);
      });
    },

    editConversation: function(dialog)
    {
      var game = this.model;

      // FIXME Load in null script like client does until migration is changed
      var intro_script = scripts.findWhere({dialog_script_id:dialog.get("intro_dialog_script_id")});

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
    }

  });
});

