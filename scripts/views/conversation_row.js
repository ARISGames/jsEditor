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
  'vent',
  'storage',
],
function(
  $,
  _,
  Backbone,
  Template,
  ConversationEditorView,
  CharactersOrganizerView,
  Media,
  Game,
  Character,
  DialogScript,
  DialogOption,
  CharactersCollection,
  MediaCollection,
  DialogScriptsCollection,
  DialogOptionsCollection,
  PlaquesCollection,
  ItemsCollection,
  WebPagesCollection,
  DialogsCollection,
  TabsCollection,
  vent,
  storage
)
{
  return Backbone.Marionette.ItemView.extend(
  {
    template: _.template(Template),

    // Bootstrap
    tagName: 'a',
    className: "list-group-item",

    templateHelpers: function()
    {
      return {
        icon_thumb_url: this.model.icon_thumbnail()
      }
    },

    events: {
      "click": "onClickEdit"
    },

    initialize: function()
    {
      // Model events
      this.listenTo(this.model, 'change', this.rebindEventsAndRender);
      this.rebindEventsAndRender();
    },

    rebindEventsAndRender: function(model)
    {
      // Thumbnail
      if(this.icon)
      {
        this.stopListening(this.icon);
      }

      this.icon = this.model.icon()
      this.listenTo(this.icon, 'change', this.render);

      // Don't render while initializing
      if(model) { this.render(); }
    },

    // TODO convert to storage collection references
    onClickEdit: function()
    {
      var game = new Game({game_id: this.model.get("game_id")});

      var dialog     = this.model;
      var my_scripts = new DialogScriptsCollection([], {parent:dialog, game:game});
      var my_options = new DialogOptionsCollection([], {parent:dialog, game:game});

      $.when(
        my_scripts.fetch(),
        my_options.fetch()
        ).done(function()
      {
        // FIXME Load in null script like client does until migration is changed
        var intro_script = my_scripts.findWhere({dialog_script_id: dialog.get("intro_dialog_script_id")});

        //add 'null' character
        var character = new Character({name: "You", dialog_character_id: "0", title: "The Player"})
        storage.dialog_characters.unshift(character);

        //add 'null' media
        var character_media = new Media({media_id: "0"});
        storage.media.push(character_media);

        var conversation_editor = new ConversationEditorView(
          {
            model:intro_script,
            dialog:dialog,
            my_scripts:my_scripts,
            my_options:my_options,
          });
        vent.trigger("application.show", conversation_editor, "Edit Conversation Script", true);
        vent.trigger("application:list:show", new CharactersOrganizerView({collection:storage.dialog_characters, model:game}));

      }.bind(this));
    }

  });
});

