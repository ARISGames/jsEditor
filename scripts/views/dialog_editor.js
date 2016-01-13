define([
  'underscore',
  'jquery',
  'backbone',
  'views/editor_base',
  'text!templates/dialog_editor.tpl',
  'vent',
  'storage',
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
],
function(
  _,
  $,
  Backbone,
  EditorView,
  Template,
  vent,
  storage,
  CharactersCollection,
  MediaCollection,
  DialogScriptsCollection,
  DialogOptionsCollection,
  PlaquesCollection,
  ItemsCollection,
  WebPagesCollection,
  DialogsCollection,
  TabsCollection,
  Media,
  Game,
  Character,
  DialogScript,
  DialogOption,
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
      return {
        is_new: this.model.isNew(),
        icon_thumbnail_url: this.model.icon_thumbnail()
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
      this.storePreviousAttributes();
      this.bindAssociations();
      this.on("popup:hide", this.onClickCancel);
    },

    onShow: function()
    {
      this.$el.find('input[autofocus]').focus();
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
      var view   = this;
      var dialog = this.model;

      dialog.save({},
      {
        create: function()
        {
          view.storePreviousAttributes();
          storage.add_game_object(dialog);
          vent.trigger("application:popup:hide");
        },

        update: function()
        {
          view.storePreviousAttributes();
          vent.trigger("application:popup:hide");
        }
      });
    },

    onClickCancel: function()
    {
      this.model.set(this.previous_attributes);
    },

    onClickDelete: function()
    {
      var view = this;
      this.model.destroy(
      {
        success: function()
        {
          vent.trigger("application:popup:hide");
        }
      });
    },

    onChangeName:              function() { console.log("hello"); var self = this; self.model.set("name",                self.ui.name.val()); },
    onChangeDescription:       function() { var self = this; self.model.set("description",         self.ui.description.val()); },
    onChangeBackButtonEnabled: function() { var self = this; self.model.set("back_button_enabled", self.ui.back_button_enabled.is(":checked") ? "1" : "0");   },

    storePreviousAttributes: function()
    {
      this.previous_attributes = _.clone(this.model.attributes)
    },

    unbindAssociations: function()
    {
      this.stopListening(this.model.icon());
    },

    bindAssociations: function()
    {
      this.listenTo(this.model.icon(), 'change', this.render);
    },

    onClickChangeIcon: function()
    {
      var view = this;

      var game  = new Game({game_id: this.model.get("game_id")});
      var media = new MediaCollection([], {parent: game});

      media.fetch(
      {
        success: function()
        {
          media.unshift(view.model.default_icon());
          var icon_chooser = new MediaChooserView({collection: media, selected: view.model.icon(), context: view.model});

          icon_chooser.on("media:choose", function(media)
          {
            view.unbindAssociations();
            view.model.set("icon_media_id", media.id);
            view.bindAssociations();
            vent.trigger("application:popup:show", view, "Edit Conversation");
          });

          icon_chooser.on("cancel", function()
          {
            vent.trigger("application:popup:show", view, "Edit Conversation");
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

      $.when(self.model.save(), characters.fetch(), media.fetch(), scripts.fetch(), options.fetch(), contents.plaques.fetch(), contents.items.fetch(), contents.web_pages.fetch(), contents.dialogs.fetch(), contents.tabs.fetch()).done(function()
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
            my_scripts:scripts,
            my_options:options,
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

