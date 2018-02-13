define([
  'underscore',
  'jquery',
  'backbone',
  'text!templates/quest_editor.tpl',
  'collections/media',
  'collections/events',
  'collections/items',
  'models/game',
  'models/event_package',
  'models/event',
  'models/quest',
  'views/media_chooser',
  'views/event_package_editor',
  'views/requirements',
  'models/requirement_package',
  'collections/and_packages',
  'collections/atoms',
  'collections/items',
  'collections/tags',
  'collections/plaques',
  'collections/dialogs',
  'collections/game_dialog_scripts',
  'collections/web_pages',
  'collections/quests',
  'collections/web_hooks',
  'storage',
  'vent',
],
function(
  _,
  $,
  Backbone,
  Template,
  MediaCollection,
  EventsCollection,
  ItemsCollection,
  Game,
  EventPackage,
  Event,
  Quest,
  MediaChooserView,
  EventPackageEditorView,
  RequirementsEditorView,
  RequirementPackage,
  AndPackagesCollection,
  AtomsCollection,
  ItemsCollection,
  TagsCollection,
  PlaquesCollection,
  DialogsCollection,
  DialogScriptsCollection,
  WebPagesCollection,
  QuestsCollection,
  WebHooksCollection,
  storage,
  vent
)
{
  return Backbone.Marionette.CompositeView.extend(
  {
    template: _.template(Template),

    templateHelpers: function()
    {
      var self = this;
      return {
        is_new: self.model.isNew(),
        active_icon_thumbnail_url:    self.model.active_icon_thumbnail(),
        active_media_thumbnail_url:   self.model.active_media_thumbnail(),
        complete_icon_thumbnail_url:  self.model.complete_icon_thumbnail(),
        complete_media_thumbnail_url: self.model.complete_media_thumbnail(),
        option_selected: function(boolean_statement) { return boolean_statement ? "selected" : ""; },
        function_types: Quest.function_types,
        quests: storage.quests,
      };
    },

    ui:
    {
      "name": "#name",
      "category": "#select-category",
      "description": "#description",
      "prompt": "#prompt",

      "active_description":"#active-description",
      "active_notification_type":"#active-notification-type",
      "active_function":"#active-function",

      "complete_description":"#complete-description",
      "complete_notification_type":"#complete-notification-type",
      "complete_function":"#complete-function",
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
      "click .save":                           "onClickSave",
      "click .delete":                         "onClickDelete",
      "click .cancel":                         "onClickCancel",
      "click .change-active-icon":             "onClickActiveIcon",
      "click .change-active-media":            "onClickActiveMedia",
      "click .change-complete-icon":           "onClickCompleteIcon",
      "click .change-complete-media":          "onClickCompleteMedia",
      "click .edit-active-requirements":       "onClickActiveRequirements",
      "click .edit-active-events":             "onClickActiveEvents",
      "click .edit-complete-requirements":     "onClickCompleteRequirements",
      "click .edit-complete-events":           "onClickCompleteEvents",
      "change @ui.name":                       "onChangeName",
      "change @ui.category":                   "onChangeCategory",
      "change @ui.description":                "onChangeDescription",
      "change @ui.prompt":                     "onChangePrompt",
      "change @ui.active_description":         "onChangeActiveDescription",
      "change @ui.active_notification_type":   "onChangeActiveNotificationType",
      "change @ui.active_function":            "onChangeActiveFunction",
      "change @ui.complete_description":       "onChangeCompleteDescription",
      "change @ui.complete_notification_type": "onChangeCompleteNotificationType",
      "change @ui.complete_function":          "onChangeCompleteFunction"
    },

    onClickSave: function()
    {
      var self = this;

      self.model.save({},
      {
        create: function()
        {
          self.trigger("quest:add", self.model);
        },
        success: function()
        {
          self.storePreviousAttributes();
          vent.trigger("application:popup:hide");
        }
      });
    },

    onClickCancel: function()
    {
      var self = this;
      delete self.previous_attributes.active_requirement_root_package_id;
      delete self.previous_attributes.complete_requirement_root_package_id;
      delete self.previous_attributes.active_event_package_id;
      delete self.previous_attributes.complete_event_package_id;
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

    onChangeName:                     function() { var self = this; self.model.set("name",                       self.ui.name.val()); },
    onChangeCategory:                 function() { var self = this; self.model.set("parent_quest_id",            self.ui.category.find("option:selected").val()) },
    onChangeDescription:              function() { var self = this; self.model.set("description",                self.ui.description.val()); },
    onChangePrompt:                   function() { var self = this; self.model.set("prompt",                     self.ui.prompt.val()); },
    onChangeActiveDescription:        function() { var self = this; self.model.set("active_description",         self.ui.active_description.val()); },
    onChangeCompleteDescription:      function() { var self = this; self.model.set("complete_description",       self.ui.complete_description.val()); },
    onChangeActiveNotificationType:   function() { var self = this; self.model.set("active_notification_type",   self.ui.active_notification_type.find("option:selected").val()) },
    onChangeCompleteNotificationType: function() { var self = this; self.model.set("complete_notification_type", self.ui.complete_notification_type.find("option:selected").val()) },
    onChangeActiveFunction:           function() { var self = this; self.model.set("active_function",            self.ui.active_function.find("option:selected").val()) },
    onChangeCompleteFunction:         function() { var self = this; self.model.set("complete_function",          self.ui.complete_function.find("option:selected").val()) },

    storePreviousAttributes: function()
    {
      var self = this;
      self.previous_attributes = _.clone(self.model.attributes)
    },

    unbindAssociations: function()
    {
      var self = this;
      self.stopListening(self.model.active_icon());
      self.stopListening(self.model.active_media());
      self.stopListening(self.model.complete_icon());
      self.stopListening(self.model.complete_media());
    },

    bindAssociations: function()
    {
      var self = this;
      self.listenTo(self.model.active_icon(),    'change', self.render);
      self.listenTo(self.model.active_media(),   'change', self.render);
      self.listenTo(self.model.complete_icon(),  'change', self.render);
      self.listenTo(self.model.complete_media(), 'change', self.render);
    },

    onClickActiveIcon: function(event)
    {
      var self = this;
      event.preventDefault();

      var game  = new Game({game_id: this.model.get("game_id")});
      var media = new MediaCollection([], {parent: game});

      media.fetch(
      {
        success:function()
        {
          media.unshift(self.model.default_icon());

          /* Icon */
          var icon_chooser = new MediaChooserView({collection: media, selected: self.model.active_icon(), context: self.model, back_view: self});
          vent.trigger("application:popup:show", icon_chooser, "Start Quest Icon");

          icon_chooser.on("media:choose",
            function(media)
            {
              self.unbindAssociations();
              self.model.set("active_icon_media_id", media.id);
              self.bindAssociations();
              vent.trigger("application:popup:show", self, "Edit Quest");
            }
          );

          icon_chooser.on("cancel",
            function()
            {
              vent.trigger("application:popup:show", self, "Edit Quest");
            }
          );
        }
      });
    },

    onClickActiveMedia: function(event)
    {
      var self = this;
      event.preventDefault();

      var game  = new Game({game_id: self.model.get("game_id")});
      var media = new MediaCollection([], {parent: game});

      media.fetch(
      {
        success: function()
        {
          media.unshift(self.model.default_icon());

          /* Icon */
          var icon_chooser = new MediaChooserView({collection: media, selected: self.model.active_media(), context: self.model, back_view: self});
          vent.trigger("application:popup:show", icon_chooser, "Start Quest Media");

          icon_chooser.on("media:choose", function(media)
          {
            self.unbindAssociations();
            self.model.set("active_media_id", media.id);
            self.bindAssociations();
            vent.trigger("application:popup:show", self, "Edit Quest");
          });

          icon_chooser.on("cancel", function()
          {
            vent.trigger("application:popup:show", self, "Edit Quest");
          });
        }
      });
    },

    onClickCompleteIcon: function(event)
    {
      var self = this;
      event.preventDefault();

      var game  = new Game({game_id: self.model.get("game_id")});
      var media = new MediaCollection([], {parent: game});

      media.fetch(
      {
        success: function()
        {
          media.unshift(self.model.default_icon());

          /* Icon */
          var icon_chooser = new MediaChooserView({collection: media, selected: self.model.complete_icon(), context: self.model, back_view: self});
          vent.trigger("application:popup:show", icon_chooser, "Complete Quest Icon");

          icon_chooser.on("media:choose", function(media)
          {
            self.unbindAssociations();
            self.model.set("complete_icon_media_id", media.id);
            self.bindAssociations();
            vent.trigger("application:popup:show", self, "Edit Quest");
          });

          icon_chooser.on("cancel", function()
          {
            vent.trigger("application:popup:show", self, "Edit Quest");
          });
        }
      });
    },

    onClickCompleteMedia: function(event)
    {
      var self = this;
      event.preventDefault();

      var game  = new Game({game_id: self.model.get("game_id")});
      var media = new MediaCollection([], {parent: game});

      media.fetch(
      {
        success: function()
        {
          media.unshift(self.model.default_icon());

          /* Icon */
          var icon_chooser = new MediaChooserView({collection: media, selected: self.model.complete_media(), context: self.model, back_view: self});
          vent.trigger("application:popup:show", icon_chooser, "Complete Quest Media");

          icon_chooser.on("media:choose", function(media)
          {
            self.unbindAssociations();
            self.model.set("complete_media_id", media.id);
            self.bindAssociations();
            vent.trigger("application:popup:show", self, "Edit Quest");
          });

          icon_chooser.on("cancel", function()
          {
            vent.trigger("application:popup:show", self, "Edit Quest");
          });
        }
      });
    },

    onClickActiveEvents:function()
    {
      var self = this;

      var game = new Game({game_id:self.model.get("game_id")});

      var event_package;
      if(self.model.get("active_event_package_id") == 0) event_package = new EventPackage({game_id:game.id});
      else                                               event_package = new EventPackage({game_id:game.id, event_package_id:self.model.get("active_event_package_id")});
      var events = new EventsCollection([], {parent:event_package});

      var items  = new ItemsCollection([], {parent:game});

      $.when(
        items.fetch(),
        event_package.fetch(),
        events.fetch()
      ).done(
        function()
        {
          if(self.model.get("active_event_package_id") == 0)
          {
            event_package.save({},
            {
              success:function()
              {
                storage.add_game_object(event_package);
                self.model.set("active_event_package_id", event_package.id);
                self.model.save({}, {
                  create:function()
                  {
                    storage.add_game_object(self.model);
                  }
                });
                var events_editor = new EventPackageEditorView({model:event_package, collection:events, items:items});
                vent.trigger("application:popup:show", events_editor, "Player Modifier");
              }
            });
          }
          else
          {
            self.model.save({}, {});
            var events_editor = new EventPackageEditorView({model:event_package, collection:events, items:items});
            vent.trigger("application:popup:show", events_editor, "Player Modifier");
          }

        }
      );
    },

    onClickCompleteEvents:function()
    {
      var self = this;

      var game = new Game({game_id:self.model.get("game_id")});

      var event_package;
      if(self.model.get("complete_event_package_id") == 0) event_package = new EventPackage({game_id:game.id});
      else                                               event_package = new EventPackage({game_id:game.id, event_package_id:self.model.get("complete_event_package_id")});
      var events = new EventsCollection([], {parent:event_package});

      var items  = new ItemsCollection([], {parent:game});

      $.when(
        items.fetch(),
        event_package.fetch(),
        events.fetch()
      ).done(
        function()
        {
          if(self.model.get("complete_event_package_id") == 0)
          {
            event_package.save({},
            {
              success:function()
              {
                storage.add_game_object(event_package);
                self.model.set("complete_event_package_id", event_package.id);
                self.model.save({}, {
                  create:function()
                  {
                    storage.add_game_object(self.model);
                  }
                });
                var events_editor = new EventPackageEditorView({model:event_package, collection:events, items:items});
                vent.trigger("application:popup:show", events_editor, "Player Modifier");
              }
            });
          }
          else
          {
            self.model.save({}, {});
            var events_editor = new EventPackageEditorView({model:event_package, collection:events, items:items});
            vent.trigger("application:popup:show", events_editor, "Player Modifier");
          }

        }
      );
    },

    onClickActiveRequirements: function()
    {
      var self = this;

      var requirement_package = new RequirementPackage({requirement_root_package_id: self.model.get("active_requirement_root_package_id"), game_id: self.model.get("game_id")});

      var game   = new Game({game_id: self.model.get("game_id")});

      var contents = {
        items:          new ItemsCollection         ([], {parent: game}),
        tags:           new TagsCollection          ([], {parent: game}),
        plaques:        new PlaquesCollection       ([], {parent: game}),
        dialogs:        new DialogsCollection       ([], {parent: game}),
        dialog_scripts: new DialogScriptsCollection ([], {parent: game}),
        web_pages:      new WebPagesCollection      ([], {parent: game}),
        quests:         new QuestsCollection        ([], {parent: game}),
        hooks:          new WebHooksCollection      ([], {parent: game})
      };
      contents.event_packages = storage.event_packages;

      // Don't fetch non existent package
      if(requirement_package.id === "0") { requirement_package.fetch = function() {}; }

      $.when(contents.items.fetch(), contents.tags.fetch(), contents.plaques.fetch(), contents.dialogs.fetch(), contents.dialog_scripts.fetch(), contents.web_pages.fetch(), contents.quests.fetch(), contents.hooks.fetch(), requirement_package.fetch()).done(function()
      {
        // Load associations into collections
        var and_packages = new AndPackagesCollection(requirement_package.get("and_packages"));
        requirement_package.set("and_packages", and_packages);

        and_packages.each(function(and_package)
        {
          var atoms = new AtomsCollection(and_package.get("atoms"));
          and_package.set("atoms", atoms);
        });

        // launch editor
        var requirements_editor = new RequirementsEditorView({model: requirement_package, collection: and_packages, contents: contents});

        requirements_editor.on("cancel", function()
        {
          vent.trigger("application:popup:show", self, "Edit Quest");
        });

        requirements_editor.on("requirement_package:save", function(requirement_package)
        {
          self.model.set("active_requirement_root_package_id", requirement_package.id);

          if(!self.model.isNew() && self.model.hasChanged("active_requirement_root_package_id"))
          {
            // Quicksave if moving from 0 so user has consistent experience
            self.model.save({"active_requirement_root_package_id": requirement_package.id}, {patch: true});
          }

          vent.trigger("application:popup:show", self, "Edit Quest");
        });

        vent.trigger("application:popup:show", requirements_editor, "Locks Editor");
      });
    },

    onClickCompleteRequirements: function()
    {
      var self = this;

      var requirement_package = new RequirementPackage({requirement_root_package_id: self.model.get("complete_requirement_root_package_id"), game_id: self.model.get("game_id")});

      var game   = new Game({game_id: self.model.get("game_id")});

      var contents =
      {
        items:          new ItemsCollection         ([], {parent: game}),
        tags:           new TagsCollection          ([], {parent: game}),
        plaques:        new PlaquesCollection       ([], {parent: game}),
        dialogs:        new DialogsCollection       ([], {parent: game}),
        dialog_scripts: new DialogScriptsCollection ([], {parent: game}),
        web_pages:      new WebPagesCollection      ([], {parent: game}),
        quests:         new QuestsCollection        ([], {parent: game}),
        hooks:          new WebHooksCollection      ([], {parent: game})
      };

      // FIXME temporary fix for conditional fetch
      if(requirement_package.id === "0") { requirement_package.fetch = function() {}; }

      $.when(contents.items.fetch(), contents.tags.fetch(), contents.plaques.fetch(), contents.dialogs.fetch(), contents.dialog_scripts.fetch(), contents.web_pages.fetch(), contents.quests.fetch(), contents.hooks.fetch(), requirement_package.fetch()).done(function()
      {
        // Load associations into collections
        var and_packages = new AndPackagesCollection(requirement_package.get("and_packages"));
        requirement_package.set("and_packages", and_packages);

        and_packages.each(function(and_package)
        {
          var atoms = new AtomsCollection(and_package.get("atoms"));
          and_package.set("atoms", atoms);
        });

        // launch editor
        var requirements_editor = new RequirementsEditorView({model: requirement_package, collection: and_packages, contents: contents});
        requirements_editor.on("cancel", function()
        {
          vent.trigger("application:popup:show", self, "Edit Quest");
        });

        requirements_editor.on("requirement_package:save", function(requirement_package)
        {
          self.model.set("complete_requirement_root_package_id", requirement_package.id);

          if(!self.model.isNew() && self.model.hasChanged("complete_requirement_root_package_id"))
          {
            // Quicksave if moving from 0 so user has consistent experience
            self.model.save({"complete_requirement_root_package_id": requirement_package.id}, {patch: true});
          }

          vent.trigger("application:popup:show", self, "Edit Quest");
        });

        vent.trigger("application:popup:show", requirements_editor, "Locks Editor");
      });
    }
  });
});

