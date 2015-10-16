define([
  'backbone',
  'text!templates/event_package_chooser.tpl',
  'models/event_package',
  'models/trigger',
  'models/instance',
  'models/media',
  'views/event_package_chooser_row',
  'views/trigger_creator',
  'vent',
  'util',
],
function(
  Backbone,
  Template,
  EventPackage,
  Trigger,
  Instance,
  Media,
  EventPackageChooserRowView,
  TriggerCreatorView,
  vent,
  util
)
{
  return Backbone.Marionette.CompositeView.extend(
  {
    template: _.template(Template),

    itemView: EventPackageChooserRowView,
    itemViewContainer: ".event-packages",

    itemViewOptions:function(model, index)
    {
      return {
        parent: this.options.parent
      }
    },

    events:
    {
      "click .new-event-package": "onClickNewEventPackage"
    },

    onClickNewEventPackage:function()
    {
      var loc = util.default_location();
      var trigger      = new Trigger     ({game_id:this.options.parent.get("game_id"), scene_id:this.options.parent.get("scene_id"), latitude:loc.latitude, longitude:loc.longitude });
      var instance     = new Instance    ({game_id:this.options.parent.get("game_id")});
      var eventPackage = new EventPackage({game_id:this.options.parent.get("game_id")});

      var trigger_creator = new TriggerCreatorView({scene:this.options.parent, game_object:eventPackage, instance:instance, model:trigger});
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

