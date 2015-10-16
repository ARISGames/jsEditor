define([
  'backbone',
  'text!templates/scene_chooser.tpl',
  'models/scene',
  'models/trigger',
  'models/instance',
  'models/media',
  'views/scene_chooser_row',
  'views/trigger_creator',
  'vent',
  'util',
],
function(
  Backbone,
  Template,
  Scene,
  Trigger,
  Instance,
  Media,
  SceneChooserRowView,
  TriggerCreatorView,
  vent,
  util
)
{
  return Backbone.Marionette.CompositeView.extend(
  {
    template: _.template(Template),

    itemView: SceneChooserRowView,
    itemViewContainer: ".scenes",

    itemViewOptions: function(model, index)
    {
      return {
        parent: this.options.parent
      }
    },

    events: {
      "click .new-scene": "onClickNewScene"
    },

    /* TODO move complex sets like this into a controller */
    onClickNewScene: function()
    {
      var loc = util.default_location();
      var trigger  = new Trigger  ({game_id:this.options.parent.get("game_id"), scene_id:this.options.parent.get("scene_id"), latitude:loc.latitude, longitude:loc.longitude });
      var instance = new Instance ({game_id: this.options.parent.get("game_id")});
      var scene    = new Scene    ({game_id: this.options.parent.get("game_id")});

      // Scenes can only be immediate for now.
      trigger.set("type", "IMMEDIATE");

      var trigger_creator = new TriggerCreatorView({scene: this.options.parent, game_object: scene, instance: instance, model: trigger});
      vent.trigger("application:popup:show", trigger_creator, "Add Scene to Scene");
    },

    // Marionette override
    appendBuffer: function(compositeView, buffer)
    {
      var $container = this.getItemViewContainer(compositeView);
      $container.find(".foot").before(buffer);
    },

    appendHtml: function(compositeView, sceneView, index)
    {
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

