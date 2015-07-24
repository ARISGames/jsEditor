define(
function(require)
{
  var Backbone                   = require('backbone');
  var Template                   = require('text!templates/event_package_chooser.tpl');
  var EventPackage               = require('models/event_package');
  var Trigger                    = require('models/trigger');
  var Instance                   = require('models/instance');
  var Media                      = require('models/media');
  var EventPackageChooserRowView = require('views/event_package_chooser_row');
  var TriggerCreatorView         = require('views/trigger_creator');
  var vent                       = require('vent');

  return Backbone.Marionette.CompositeView.extend(
  {
    template: _.template(Template),

    itemView: EventPackageChooserRowView,
    itemViewContainer: ".event-packages",

    itemViewOptions: function(model, index)
    {
      return {
        parent: this.options.parent
      }
    },

    events:
    {
      "click .new-event-package": "onClickNewEventPackage"
    },

    onClickNewEventPackage: function()
    {
      var eventPackage = new EventPackage({game_id: this.options.parent.get("game_id")});
      var trigger      = new Trigger     ({game_id: this.options.parent.get("game_id"),scene_id: this.options.parent.get("scene_id")});
      var instance     = new Instance    ({game_id: this.options.parent.get("game_id")});

      var trigger_creator = new TriggerCreatorView({scene: this.options.parent, game_object:eventPackage, instance: instance, model: trigger});
      vent.trigger("application:popup:show", trigger_creator, "Add Event to Scene");
    },

    // Marionette override
    appendBuffer: function(compositeView, buffer)
    {
      var $container = this.getItemViewContainer(compositeView);
      $container.find(".foot").before(buffer);
    },

    appendHtml: function(compositeView, itemView, index)
    {
      if(compositeView.isBuffering)
      {
        compositeView.elBuffer.appendChild(itemView.el);
      }
      else
      {
        // If we've already rendered the main collection, just
        // append the new items directly into the element.
        var $container = this.getItemViewContainer(compositeView);
        $container.find(".foot").before(itemView.el);
      }
    }

  });
});

