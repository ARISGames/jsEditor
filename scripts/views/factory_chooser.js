define(
function(require)
{
  var Backbone              = require('backbone');
  var Template              = require('text!templates/factory_chooser.tpl');
  var Factory               = require('models/factory');
  var Trigger               = require('models/trigger');
  var Instance              = require('models/instance');
  var Media                 = require('models/media');
  var FactoryChooserRowView = require('views/factory_chooser_row');
  var TriggerCreatorView    = require('views/trigger_creator');
  var vent                  = require('vent');

  return Backbone.Marionette.CompositeView.extend({
    template: _.template(Template),

    itemView: FactoryChooserRowView,
    itemViewContainer: ".factorys",

    itemViewOptions: function(model, index) {
      return {
        parent: this.options.parent
      }
    },

    events: {
      "click .new-factory": "onClickNewFactory"
    },

    /* TODO move complex sets like this into a controller */
    onClickNewFactory: function() {
      var factory  = new Factory  ({game_id: this.options.parent.get("game_id")});
      var trigger  = new Trigger  ({game_id: this.options.parent.get("game_id"),scene_id: this.options.parent.get("scene_id")});
      var instance = new Instance ({game_id: this.options.parent.get("game_id")});

      // Scenes can only be immediate for now.
      trigger.set("type", "IMMEDIATE");

      var trigger_creator = new TriggerCreatorView({scene: this.options.parent, game_object: factory, instance: instance, model: trigger});
      vent.trigger("application:popup:show", trigger_creator, "Add Factory to Scene");
    },

    // Marionette override
    appendBuffer: function(compositeView, buffer) {
      var $container = this.getItemViewContainer(compositeView);
      $container.find(".foot").before(buffer);
    },

    appendHtml: function(compositeView, itemView, index){
      if (compositeView.isBuffering) {
        compositeView.elBuffer.appendChild(itemView.el);
      }
      else {
        // If we've already rendered the main collection, just
        // append the new items directly into the element.
        var $container = this.getItemViewContainer(compositeView);
        $container.find(".foot").before(itemView.el);
      }
    }

  });
});

