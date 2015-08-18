define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/conversation_row.tpl',
  'views/conversation_editor',
  'views/character_organizer',
  'models/media',
  'models/game',
  'newfangled/dialog_characters_model',
  'newfangled/dialog_scripts_model',
  'newfangled/dialog_options_model',
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
  $,
  _,
  Backbone,
  Template,
  ConversationEditorView,
  CharactersOrganizerView,
  Media,
  Game,
  DialogCharacterModel,
  DialogScriptModel,
  DialogOptionModel,
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
  return Backbone.Marionette.ItemView.extend(
  {
    template: _.template(Template),

    tagName: 'a',
    className: "list-group-item",

    templateHelpers: function()
    {
      return { icon_thumb_url: this.model.icon_thumbnail() }
    },

    events:
    {
      "click":"onClickEdit"
    },

    initialize: function()
    {
      var self = this;
      //self.listenTo(self.model, 'change', self.rebindEventsAndRender);
      self.rebindEventsAndRender();
    },

    rebindEventsAndRender: function(model)
    {
      var self = this;
      //if(self.icon) { self.stopListening(self.icon); }

      self.icon = self.model.icon()
      //self.listenTo(self.icon, 'change', self.render);

      if(model) { self.render(); }
    },

    onClickEdit: function()
    {
      var self = this;

      var conversation_editor_view = new ConversationEditorView({model:self.model});
      vent.trigger("application.show", conversation_editor_view, "Edit Conversation Script", true);
      vent.trigger("application:list:show", new CharactersOrganizerView({collection:storage.dialog_characters, model:storage.game}));
    }

  });
});

