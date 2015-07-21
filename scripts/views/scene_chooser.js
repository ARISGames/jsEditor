define(
function(require)
{
  var Backbone             = require('backbone');
  var Template             = require('text!templates/scene_chooser.tpl');
  var Scene                = require('models/scene');
  var Trigger              = require('models/trigger');
  var Instance             = require('models/instance');
  var Media                = require('models/media');
  var SceneChooserRowView  = require('views/scene_chooser_row');
  var TriggerCreatorView   = require('views/trigger_creator');
  var vent                 = require('vent');

  return Backbone.Marionette.CompositeView.extend({
    template: _.template(Template),

    itemView: SceneChooserRowView,
    itemViewContainer: ".scenes",

    itemViewOptions: function(model, index) {
      return {
        parent: this.options.parent
      }
    },

    events: {
      "click .new-scene": "onClickNewScene"
    },

    /* TODO move complex sets like this into a controller */
    onClickNewScene: function() {
      var scene    = new Scene    ({game_id: this.options.parent.get("game_id")});
      var trigger  = new Trigger  ({game_id: this.options.parent.get("game_id"), scene_id: this.options.parent.get("scene_id")});
      var instance = new Instance ({game_id: this.options.parent.get("game_id")});

      // Scenes can only be immediate for now.
      trigger.set("type", "IMMEDIATE");

      var trigger_creator = new TriggerCreatorView({scene: this.options.parent, game_object: scene, instance: instance, model: trigger});
      vent.trigger("application:popup:show", trigger_creator, "Add Scene to Scene");
    },

    // Marionette override
    appendBuffer: function(compositeView, buffer) {
      var $container = this.getItemViewContainer(compositeView);
      $container.find(".foot").before(buffer);
    },

    appendHtml: function(compositeView, sceneView, index){
      if (compositeView.isBuffering) {
        compositeView.elBuffer.appendChild(sceneView.el);
      }
      else {
        // If we've already rendered the main collection, just
        // append the new scenes directly into the element.
        var $container = this.getItemViewContainer(compositeView);
        $container.find(".foot").before(sceneView.el);
      }
    }

  });
});

