define([
  'backbone',
  'text!templates/plaque_chooser.tpl',
  'models/plaque',
  'models/trigger',
  'models/instance',
  'models/media',
  'views/plaque_chooser_row',
  'views/trigger_creator',
  'vent',
],
function(
  Backbone,
  Template,
  Plaque,
  Trigger,
  Instance,
  Media,
  PlaqueChooserRowView,
  TriggerCreatorView,
  vent
)
{
  return Backbone.Marionette.CompositeView.extend({
    template: _.template(Template),

    itemView: PlaqueChooserRowView,
    itemViewContainer: ".plaques",

    itemViewOptions: function(model, index) {
      return {
        parent: this.options.parent
      }
    },

    events: {
      "click .new-plaque": "onClickNewPlaque"
    },

    /* TODO move complex sets like this into a controller */
    onClickNewPlaque: function() {
      var plaque   = new Plaque   ({game_id: this.options.parent.get("game_id")});
      var trigger  = new Trigger  ({game_id: this.options.parent.get("game_id"),scene_id: this.options.parent.get("scene_id")});
      var instance = new Instance ({game_id: this.options.parent.get("game_id")});

      var trigger_creator = new TriggerCreatorView({scene: this.options.parent, game_object: plaque, instance: instance, model: trigger});
      vent.trigger("application:popup:show", trigger_creator, "Add Plaque to Scene");
    },

    // Marionette override
    appendBuffer: function(compositeView, buffer) {
      var $container = this.getItemViewContainer(compositeView);
      $container.find(".foot").before(buffer);
    },

    appendHtml: function(compositeView, plaqueView, index){
      if (compositeView.isBuffering) {
        compositeView.elBuffer.appendChild(plaqueView.el);
      }
      else {
        // If we've already rendered the main collection, just
        // append the new plaques directly into the element.
        var $container = this.getItemViewContainer(compositeView);
        $container.find(".foot").before(plaqueView.el);
      }
    }
  });
});

