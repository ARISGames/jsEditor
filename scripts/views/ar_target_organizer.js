define([
  'backbone',
  'text!templates/ar_target_organizer.tpl',
  'views/ar_target_organizer_row',
  'vent'
],
function(
  Backbone,
  Template,
  ARTargetOrganizerRowView,
  vent
)
{
  return Backbone.Marionette.CompositeView.extend(
  {
    template: _.template(Template),

    itemView: ARTargetOrganizerRowView,
    itemViewContainer: ".ar_target",

    className: 'ar_target-organizer',

    initialize: function()
    {
      var view = this;
      vent.on("ar_target:upload", function(ar_target)
      {
        view.collection.add(ar_target);
      });
    },

  });
});

