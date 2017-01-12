define([
  'underscore',
  'backbone',
  'text!templates/ar_target_editor_thumbnail.tpl',
  'vent'
],
function(
  _,
  Backbone,
  Template,
  vent
)
{
  return Backbone.Marionette.ItemView.extend({
    template: _.template(Template),

    templateHelpers: function()
    {
      return {
        thumb_url: this.model.thumbnail()
      }
    },

    className: "col-xs-6 col-sm-4 col-md-3 col-lg-3 padded-small",

    events: {
    },

    modelEvents: {
      "change": "render"
    },

  });
});
