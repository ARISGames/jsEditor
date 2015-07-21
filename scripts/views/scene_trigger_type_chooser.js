define(
function(require)
{
  var _        = require('underscore');
  var Backbone = require('backbone');
  var Template = require('text!templates/scene_trigger_type_chooser.tpl');

  var SceneInstanceTriggerView = require('views/scene_instance_trigger');

  var DialogChooserView  = require('views/dialog_chooser');
  var ItemChooserView    = require('views/item_chooser');
  var PlaqueChooserView  = require('views/plaque_chooser');
  var WebPageChooserView = require('views/web_page_chooser');
  var SceneChooserView   = require('views/scene_chooser');
  var FactoryChooserView = require('views/factory_chooser');

  var DialogsCollection   = require('collections/dialogs');
  var ItemsCollection     = require('collections/items');
  var PlaquesCollection   = require('collections/plaques');
  var WebPagesCollection  = require('collections/web_pages');
  var ScenesCollection    = require('collections/scenes');
  var FactoriesCollection = require('collections/factories');

  var vent = require('vent');

  return Backbone.Marionette.CompositeView.extend({
    template: _.template(Template),

    events: {
      "click .add-dialog":   "onClickAddDialog",
      "click .add-plaque":   "onClickAddPlaque",
      "click .add-web-page": "onClickAddWebPage",
      "click .add-item":     "onClickAddItem",
      "click .add-scene":    "onClickAddScene",
      "click .add-factory":  "onClickAddFactory"
    },

    initialize: function(options) {
      this.game = options.game;
    },

    onClickAddDialog: function() {
      var scene = this.model;

      var dialogs = new DialogsCollection([], {parent: this.game});

      dialogs.fetch({
        success: function() {
          var dialog_chooser = new DialogChooserView({collection: dialogs, parent: scene});
          vent.trigger("application:popup:show", dialog_chooser, "Add Conversation to Scene");
        }
      });
    },

    onClickAddItem: function() {
      var scene = this.model;

      var items = new ItemsCollection([], {parent: this.game});

      items.fetch({
        success: function() {
          var item_chooser = new ItemChooserView({collection: items, parent: scene});
          vent.trigger("application:popup:show", item_chooser, "Add Item to Scene");
        }
      });
    },

    onClickAddPlaque: function() {
      var scene = this.model;

      var plaques = new PlaquesCollection([], {parent: this.game});

      plaques.fetch({
        success: function() {
          var plaque_chooser = new PlaqueChooserView({collection: plaques, parent: scene});
          vent.trigger("application:popup:show", plaque_chooser, "Add Plaque to Scene");
        }
      });
    },

    onClickAddWebPage: function() {
      var scene = this.model;

      var web_pages = new WebPagesCollection([], {parent: this.game});

      web_pages.fetch({
        success: function() {
          var web_page_chooser = new WebPageChooserView({collection: web_pages, parent: scene});
          vent.trigger("application:popup:show", web_page_chooser, "Add Web Page to Scene");
        }
      });
    },

    onClickAddScene: function() {
      var scene = this.model;

      var scenes = new ScenesCollection([], {parent: this.game});

      scenes.fetch({
        success: function() {

          // Remove current scene from list
          scenes.remove(scene);

          var scene_chooser = new SceneChooserView({collection: scenes, parent: scene});
          vent.trigger("application:popup:show", scene_chooser, "Add Scene Switch to Scene");
        }
      });
    },

    onClickAddFactory: function() {
      var scene = this.model;

      var factories = new FactoriesCollection([], {parent: this.game});

      factories.fetch({
        success: function() {
          var factory_chooser = new FactoryChooserView({collection: factories, parent: scene});
          vent.trigger("application:popup:show", factory_chooser, "Add Factory to Scene");
        }
      });
    }
  });
});

