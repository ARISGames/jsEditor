define([
  'backbone',
  'text!templates/ar_target_organizer_row.tpl',
  'vent'
],
function(
  Backbone,
  Template,
  vent
)
{
  return Backbone.Marionette.CompositeView.extend({
    template: _.template(Template),

    events: {
    },

    initialize: function()
    {
      var view = this;
      vent.on("ar_target:update", function(ar_target)
      {
        if(ar_target.id === view.model.id) {
          view.model = ar_target;
          view.render();
        }
      });
    },

    tagName: 'tr',

  });
});
