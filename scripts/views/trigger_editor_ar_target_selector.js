define([
  'underscore',
  'jquery',
  'backbone',
  'text!templates/trigger_editor_ar_target_selector.tpl',
  'vent',
  'storage',
],
function(
  _,
  $,
  Backbone,
  Template,
  vent,
  storage
)
{
  return Backbone.Marionette.CompositeView.extend(
  {
    template: _.template(Template),
    templateHelpers: function()
    {
      var self = this;

      return {
        trigger_target_id: this.model.ar_target_id,

        ar_targets: storage.ar_targets,

        option_selected: function(boolean_statement) { return boolean_statement ? "selected" : ""; },
      }
    },

    ui:
    {
      ar_target_select: "#instance-ar_target_id"
    },

    events:
    {
      "change @ui.ar_target_select": "onChangeARTarget"
    },

    initialize: function()
    {
      var self = this;
      self.listenTo(storage.ar_targets, "change add remove", self.render);
    },

    onChangeARTarget: function()
    {
      var id   = this.ui.ar_target_select.find("option:selected").val();

      var trigger_target_id = id;
      this.trigger("trigger_target:choose", trigger_target_id);
    }

  });
});

