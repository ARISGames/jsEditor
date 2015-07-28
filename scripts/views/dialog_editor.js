define([
  'underscore',
  'jquery',
  'backbone',
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
  return Backbone.Marionette.CompositeView.extend(
  {
    template: _.template(Template),

    /* View */

    templateHelpers: function()
    {
      return {
        is_new: this.model.isNew(),
        icon_thumbnail_url: this.model.icon_thumbnail()
      }
    },


    ui: {
      "save":   ".save",
      "delete": ".delete",
      "cancel": ".cancel",

      "change_icon": ".change-icon",
      "edit_script": ".edit-script",

      "name":        "#dialog-name",
      "description": "#dialog-description"
    },


    /* Constructor */

    initialize: function()
    {
      // Allow returning to original attributes
      this.storePreviousAttributes();

      // Listen to association events on media
      this.bindAssociations();

      // Handle cancel from modal X or dark area
      this.on("popup:hide", this.onClickCancel);
    },


    /* View Events */

    onShow: function()
    {
      this.$el.find('input[autofocus]').focus();
    },

    events: {
      "click @ui.save":        "onClickSave",
      "click @ui.delete":      "onClickDelete",
      "click @ui.cancel":      "onClickCancel",

      "click @ui.change_icon": "onClickChangeIcon",
      "click @ui.edit_script": "onClickEditConversation",

      // Field events
      "change @ui.name":        "onChangeName",
      "change @ui.description": "onChangeDescription"
    },



    /* Crud */

    onClickSave: function()
    {
      var view   = this;
      var dialog = this.model;

      dialog.save({}, {
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
      this.model.destroy({
        success: function()
        {
          vent.trigger("application:popup:hide");
        }
      });
    },


    /* Field Changes */

    onChangeName:        function() { this.model.set("name",        this.ui.name.val()); },
    onChangeDescription: function() { this.model.set("description", this.ui.description.val()); },


    /* Undo and Association Binding */

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


    /* Media Selector */

    onClickChangeIcon: function()
    {
      var view = this;

      var game  = new Game({game_id: this.model.get("game_id")});
      var media = new MediaCollection([], {parent: game});

      media.fetch({
        success: function()
        {
          /* Add default */
          media.unshift(view.model.default_icon());

          /* Icon */
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


    /* Conversation Editor */

    onClickEditConversation: function()
    {
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
