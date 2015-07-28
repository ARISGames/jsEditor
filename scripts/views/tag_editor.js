define([
  'underscore',
  'jquery',
  'backbone',
  'text!templates/tag_editor.tpl',
  'collections/media',
  'collections/items',
  'models/game',
  'models/tag',
  'views/media_chooser',
  'vent'
],
function(
  _,
  $,
  Backbone,
  Template,
  MediaCollection,
  ItemsCollection,
  Game,
  Tag,
  MediaChooserView,
  vent
)
{
  return Backbone.Marionette.CompositeView.extend({

    /* View */

    template: _.template(Template),

    templateHelpers: function()
    {
      return {
        is_new: this.model.isNew(),

        media_thumbnail_url: this.model.media_thumbnail(),

        is_checked: function(value)
        {
          return value === "1" ? "checked" : "";
        },
      };
    },

    ui: {
      "tag":     "#tag",
      "visible": "#visible"
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
      "click .save":   "onClickSave",
      "click .cancel": "onClickCancel",
      "click .delete": "onClickDelete",

      "click .change-media":       "onClickMedia",

      // Field events
      "change @ui.tag":     "onChangeTag",
      "change @ui.visible": "onChangeVisible"
    },


    /* Crud */

    onClickSave: function()
    {
      var view  = this;

      view.model.save({}, {
        create: function()
        {
          view.storePreviousAttributes();

          view.trigger("tag:add", view.model);
        },

        success: function()
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
      this.model.destroy({
        success: function()
        {
          vent.trigger("application:popup:hide");
        }
      });
    },


    /* Field Changes */

    onChangeTag:     function() { this.model.set("tag",     this.ui.tag.val()); },
    onChangeVisible: function() { this.model.set("visible", this.ui.visible.is(":checked") ? "1" : "0"); },


    /* Undo and Association Binding */

    storePreviousAttributes: function()
    {
      this.previous_attributes = _.clone(this.model.attributes)
    },

    unbindAssociations: function()
    {
      this.stopListening(this.model.media());
    },

    bindAssociations: function()
    {
      this.listenTo(this.model.media(), 'change', this.render);
    },


    /* Media Selection */

    onClickMedia: function(event)
    {
      var view = this;
      event.preventDefault();

      var game  = new Game({game_id: this.model.get("game_id")});
      var media = new MediaCollection([], {parent: game});

      media.fetch({
        success: function()
        {
          /* Add default */
          media.unshift(view.model.default_icon());

          /* Media */
          var media_chooser = new MediaChooserView({collection: media, selected: view.model.media()});
          vent.trigger("application:popup:show", media_chooser, "Tag Media");

          media_chooser.on("media:choose", function(media)
          {
            view.unbindAssociations();
            view.model.set("media_id", media.id);
            view.bindAssociations();
            vent.trigger("application:popup:show", view, "Edit Tag");
          });

          media_chooser.on("cancel", function()
          {
            vent.trigger("application:popup:show", view, "Edit Tag");
          });
        }
      });
    }
  });
});
