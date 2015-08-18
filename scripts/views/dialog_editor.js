define([
  'underscore',
  'jquery',
  'backbone',
  'views/editor_base',
  'text!templates/dialog_editor.tpl',
  'vent',
  'storage',
  'newfangled/dialog_characters_model',
  'newfangled/dialog_scripts_model',
  'newfangled/dialog_options_model',
  'collections/media',
  'collections/plaques',
  'collections/items',
  'collections/web_pages',
  'collections/dialogs',
  'collections/tabs',
  'models/media',
  'models/game',
  'views/media_chooser',
  'views/conversation_editor',
  'views/character_organizer',
],
function(
  _,
  $,
  Backbone,
  EditorView,
  Template,
  vent,
  storage,
  DialogCharactersModel,
  DialogScriptsModel,
  DialogOptionsModel,
  MediaCollection,
  PlaquesCollection,
  ItemsCollection,
  WebPagesCollection,
  DialogsCollection,
  TabsCollection,
  Media,
  Game,
  MediaChooserView,
  ConversationEditorView,
  CharactersOrganizerView
)
{
  return EditorView.extend(
  {
    template: _.template(Template),

    templateHelpers: function()
    {
      var self = this;
      return {
        is_new: self.model.isNew(),
        icon_thumbnail_url: self.model.icon_thumbnail()
      }
    },

    ui:
    {
      "save":   ".save",
      "delete": ".delete",
      "cancel": ".cancel",
      "change_icon": ".change-icon",
      "edit_script": ".edit-script",
      "name":        "#dialog-name",
      "description": "#dialog-description",
      "back_button_enabled": "#dialog-back_button_enabled",
    },

    initialize: function()
    {
      var self = this;
      self.storePreviousAttributes();
      self.bindAssociations();
      self.on("popup:hide", self.onClickCancel);
    },

    onShow: function()
    {
      var self = this;
      self.$el.find('input[autofocus]').focus();
    },

    events:
    {
      "click @ui.save":        "onClickSave",
      "click @ui.delete":      "onClickDelete",
      "click @ui.cancel":      "onClickCancel",
      "click @ui.change_icon": "onClickChangeIcon",
      "click @ui.edit_script": "onClickEditConversation",
      "change @ui.name":        "onChangeName",
      "change @ui.description": "onChangeDescription",
      "change @ui.back_button_enabled": "onChangeBackButtonEnabled",
    },

    onClickSave: function()
    {
      var self = this;
      var dialog = self.model;

      dialog.save({},
      {
        create: function()
        {
          self.storePreviousAttributes();
          storage.add_game_object(dialog);
          vent.trigger("application:popup:hide");
        },

        update: function()
        {
          self.storePreviousAttributes();
          vent.trigger("application:popup:hide");
        }
      });
    },

    onClickCancel: function()
    {
      var self = this;
      self.model.set(self.previous_attributes);
    },

    onClickDelete: function()
    {
      var self = this;
      self.model.destroy(
      {
        success: function()
        {
          vent.trigger("application:popup:hide");
        }
      });
    },

    onChangeName:              function() { var self = this; self.model.set("name",                self.ui.name.val()); },
    onChangeDescription:       function() { var self = this; self.model.set("description",         self.ui.description.val()); },
    onChangeBackButtonEnabled: function() { var self = this; self.model.set("back_button_enabled", self.ui.back_button_enabled.is(":checked") ? "1" : "0");   },

    storePreviousAttributes: function()
    {
      var self = this;
      self.previous_attributes = _.clone(self.model.attributes)
    },

    unbindAssociations: function()
    {
      var self = this;
      self.stopListening(self.model.icon());
    },

    bindAssociations: function()
    {
      var self = this;
      self.listenTo(self.model.icon(), 'change', self.render);
    },

    onClickChangeIcon: function()
    {
      var self = this;

      var game  = new Game({game_id: self.model.get("game_id")});
      var media = new MediaCollection([], {parent: game});

      media.fetch(
      {
        success: function()
        {
          media.unshift(self.model.default_icon());
          var icon_chooser = new MediaChooserView({collection: media, selected: self.model.icon(), context: self.model});

          icon_chooser.on("media:choose", function(media)
          {
            self.unbindAssociations();
            self.model.set("icon_media_id", media.id);
            self.bindAssociations();
            vent.trigger("application:popup:show", self, "Edit Conversation");
          });

          icon_chooser.on("cancel", function()
          {
            vent.trigger("application:popup:show", self, "Edit Conversation");
          });

          vent.trigger("application:popup:show", icon_chooser, "Choose Icon");
        }
      });
    },

    onClickEditConversation: function()
    {
      var self = this;
      var game = new Game({game_id: self.model.get("game_id")});

      var dialog     = self.model;
      var characters = new CharactersCollection   ([], {parent:game});
      var media      = new MediaCollection        ([], {parent:game});
      var scripts    = new DialogScriptsCollection([], {parent:dialog, game:game});
      var options    = new DialogOptionsCollection([], {parent:dialog, game:game});

      var contents =
      {
        plaques:    new PlaquesCollection  ([], {parent:game}),
        items:      new ItemsCollection    ([], {parent:game}),
        web_pages:  new WebPagesCollection ([], {parent:game}),
        dialogs:    new DialogsCollection  ([], {parent:game}),
        tabs:       new TabsCollection     ([], {parent:game})
      };

      $.when(
        characters.fetch(),
        media.fetch(),
        scripts.fetch(),
        options.fetch(),
        contents.plaques.fetch(),
        contents.items.fetch(),
        contents.web_pages.fetch(),
        contents.dialogs.fetch(),
        contents.tabs.fetch()
      ).done(function()
      {
        var intro_script = scripts.findWhere({dialog_script_id:dialog.get("intro_dialog_script_id")});
        var character = new Character({name:"You", dialog_character_id:"0", title:"The Player"})
        characters.unshift(character);
        var character_media = new Media({media_id:"0"});
        media.push(character_media);

        var conversations_editor = new ConversationEditorView(
          {
            model:intro_script,
            dialog:dialog,
            characters:characters,
            media:media,
            scripts:scripts,
            script_options:options,
            contents:contents,
            game:game
          });
        vent.trigger("application.show", conversations_editor, "Edit Conversation Script", true);
        vent.trigger("application:list:show", new CharactersOrganizerView({collection:characters, model:game}));
        vent.trigger("application:info:hide");

        Backbone.history.navigate("#games/"+self.model.get('game_id')+"/conversations");
        vent.trigger("application:active_nav", ".conversations");
        vent.trigger("application:popup:hide");

      }.bind(self));
    }
  });

});

