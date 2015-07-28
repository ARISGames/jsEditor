define([
  'underscore',
  'backbone',
  'text!templates/note_comment_row.tpl',
  'vent',
],
function(
  _,
  Backbone,
  Template,
  vent
)
{
  return Backbone.Marionette.ItemView.extend(
  {
    template: _.template(Template),

    // Bootstrap
    className: "list-group-item",

    templateHelpers: function()
    {
      return {
        user_name: this.model.user ().get("display_name"),
      }
    },

    initialize: function(options)
    {
      // FIXME my having sub views this can be removed.
      this.model.user().on('change', this.render);
    },

    events: {
      "click .remove": "onClickRemove"
    },

    onClickRemove: function() {
      this.model.destroy();
    }
  });
});

