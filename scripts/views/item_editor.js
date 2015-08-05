define([
  'underscore',
  'jquery',
  'views/editor_base',
  'text!templates/item_editor.tpl',
  'collections/media',
  'models/game',
  'views/media_chooser',
  'views/event_inference_row',
  'vent',
  'storage',
],
function(
  _,
  $,
  EditorView,
  Template,
  MediaCollection,
  Game,
  MediaChooserView,
  EventInferenceRow,
  vent,
  storage
)
{
  return EditorView.extend(
  {
    template: _.template(Template),

    itemView: EventInferenceRow,
    itemViewContainer: ".events",

    templateHelpers: function()
    {
      var self = this;
      return {
        is_new: self.model.isNew(),
        icon_thumbnail_url:  self.model.icon_thumbnail(),
        media_thumbnail_url: self.model.media_thumbnail()
      }
    },

    ui:
    {
      "save":   ".save",
      "delete": ".delete",
      "cancel": ".cancel",

      "change_icon":  ".change-icon",
      "change_media": ".change-media",

      "name":               "#item-name",
      "description":        "#item-description",
      "url":                "#item-url",
      "delta_notification": "#item-delta_notification",
      "droppable":          "#item-droppable",
      "destroyable":        "#item-destroyable",
      "weight":             "#item-weight",
      "max_qty":            "#item-max_qty_in_inventory",
      "item_types":         ".item-type",
      "type_tabs":          ".type-tab"
    },

    initialize: function()
    {
      var self = this;

      self.storePreviousAttributes();
      self.bindAssociations();
      self.on("popup:hide", self.onClickCancel);
      self.loadInferences();
    },

    onShow: function()
    {
      self.$el.find('input[autofocus]').focus();
    },

    events:
    {
      "click @ui.save":   "onClickSave",
      "click @ui.delete": "onClickDelete",
      "click @ui.cancel": "onClickCancel",

      "click @ui.change_icon":  "onClickChangeIcon",
      "click @ui.change_media": "onClickChangeMedia",

      // Field events
      "change @ui.name":               "onChangeName",
      "change @ui.description":        "onChangeDescription",
      "change @ui.url":                "onChangeUrl",
      "change @ui.weight":             "onChangeWeight",
      "change @ui.delta_notification": "onChangeDeltaNotification",
      "change @ui.droppable":          "onChangeDroppable",
      "change @ui.destroyable":        "onChangeDestroyable",
      "change @ui.max_qty":            "onChangeMaxQuantity",

      "change @ui.item_types":          "onChangeType"
    },

    /* Crud */

    onClickSave: function()
    {
      var self = this;
      var item = self.model;

      item.save({},
      {
        create: function()
        {
          self.storePreviousAttributes();
          storage.add_game_object(item);
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

    onChangeName:        function() { var self = this; self.model.set("name",        self.ui.name.val()); },
    onChangeDescription: function() { var self = this; self.model.set("description", self.ui.description.val()); },
    onChangeUrl:         function() { var self = this; self.model.set("url",         self.ui.url.val()); },
    onChangeWeight:      function() { var self = this; self.model.set("weight",      self.ui.weight.val()); },

    onChangeDeltaNotification: function() { var self = this; self.model.set("delta_notification", self.ui.delta_notification.is(":checked") ? "1" : "0");   },
    onChangeDroppable:         function() { var self = this; self.model.set("droppable",          self.ui.droppable.is(":checked")          ? "1" : "0");   },
    onChangeDestroyable:       function() { var self = this; self.model.set("destroyable",        self.ui.destroyable.is(":checked")        ? "1" : "0"); },

    onChangeMaxQuantity: function() { var self = this; self.model.set("max_qty_in_inventory", self.ui.max_qty.val()); },

    onChangeType: function()
    {
      var self = this;
      var selected_radio = self.$el.find(".item-type:checked");

      self.model.set("type", selected_radio.val());

      // Hide radio buttons and add bootstrap classes
      //
      self.ui.item_types.parent().removeClass("active");
      selected_radio.parent().addClass("active");


      // Hide all and open selected tab
      //
      self.ui.type_tabs.hide();

      var display_tab = "." + selected_radio.val() + "-fields";
      $(display_tab).show();
    },


    /* Undo and Association Binding */

    storePreviousAttributes: function()
    {
      var self = this;
      self.previous_attributes = _.clone(self.model.attributes)
    },

    unbindAssociations: function()
    {
      var self = this;
      self.stopListening(self.model.icon());
      self.stopListening(self.model.media());
    },

    bindAssociations: function()
    {
      var self = this;
      self.listenTo(self.model.icon(),  'change', self.render);
      self.listenTo(self.model.media(), 'change', self.render);
    },

    /* Media Selectors */

    onClickChangeIcon: function()
    {
      var self = this;

      var game  = new Game({game_id: self.model.get("game_id")});
      var media = new MediaCollection([], {parent: game});

      media.fetch({
        success: function()
        {
          /* Add default */
          media.unshift(self.model.default_icon());

          /* Icon */
          var icon_chooser = new MediaChooserView({collection:media, selected:self.model.icon(), context:self.model});

          icon_chooser.on("media:choose", function(media)
          {
            self.unbindAssociations();
            self.model.set("icon_media_id", media.id);
            self.bindAssociations();
            vent.trigger("application:popup:show", self, "Edit Item");
          });

          icon_chooser.on("cancel", function()
          {
            vent.trigger("application:popup:show", self, "Edit Item");
          });

          vent.trigger("application:popup:show", icon_chooser, "Choose Icon");
        }
      });
    },

    onClickChangeMedia: function()
    {
      var self = this;

      var game  = new Game({game_id: self.model.get("game_id")});
      var media = new MediaCollection([], {parent: game});

      media.fetch(
      {
        success: function()
        {
          media.unshift(self.model.default_icon());

          var media_chooser = new MediaChooserView({collection:media, selected:self.model.media()});
          vent.trigger("application:popup:show", media_chooser, "Choose Media");

          media_chooser.on("media:choose", function(media)
          {
            self.unbindAssociations();
            self.model.set("media_id", media.id);
            self.bindAssociations();
            vent.trigger("application:popup:show", self, "Edit Item");
          });

          media_chooser.on("cancel", function()
          {
            vent.trigger("application:popup:show", self, "Edit Item");
          });
        }
      });
    },

    loadInferences: function()
    {
      var self = this;
      var item = self.model;

      // FIXME Add easier event binding to new/missing models so no local prefetch is needed (or is done outside this)
      // Right now: Fetch these locally just so the association on event will work without re-rendering.
      var contents =
      {
        quests:         storage.quests,
        dialog_scripts: storage.dialog_scripts
      };

      $.when(contents.dialog_scripts.fetch(), contents.quests.fetch()).done(function()
      {
        var item_events = storage.event_packages.filter(function(event)
        {
          return event.get("content_id") === item.id && event.modified_by() !== null
        });

        self.collection.reset(item_events);
        if(item_events.length > 0)
        {
          self.$el.find('.inference_label').removeClass('hidden');
        }
      });
    }
  }); /* class */
}); /* define */

