define([
  'underscore',
  'jquery',
  'backbone',
  'text!templates/group_editor.tpl',
  'models/group',
  'vent',
],
function(
  _,
  $,
  Backbone,
  Template,
  Group,
  vent
)
{
  return Backbone.Marionette.CompositeView.extend(
  {
    template: _.template(Template),

    templateHelpers: function()
    {
      return {
        is_new: this.model.isNew(),
      };
    },

    ui:
    {
      "save":   ".save",
      "delete": ".delete",
      "cancel": ".cancel",

      "name": "#name",
    },

    initialize: function(options)
    {
      this.storePreviousAttributes();
      this.on("popup:hide", this.onClickCancel);
    },

    onShow: function()
    {
      this.$el.find('input[autofocus]').focus();
    },

    events:
    {
      "click @ui.save":   "onClickSave",
      "click @ui.cancel": "onClickCancel",
      "click @ui.delete": "onClickDelete",
      "change @ui.name": "onChangeName",
    },

    onClickSave: function()
    {
      var self = this;

      self.model.save({},
      {
        create: function()
        {
          self.storePreviousAttributes();
          self.trigger("group:add", self.model);
        },

        success: function()
        {
          self.storePreviousAttributes();
          vent.trigger("application:popup:hide");
        }
      });
    },

    onClickCancel: function()
    {
      delete this.previous_attributes.requirement_root_package_id;
      this.model.set(this.previous_attributes);
    },

    onClickDelete: function()
    {
      this.model.destroy(
      {
        success: function()
        {
          vent.trigger("application:popup:hide");
        }
      });
    },

    onChangeName: function() { this.model.set("name", this.ui.name.val()); },

    storePreviousAttributes: function()
    {
      this.previous_attributes = _.clone(this.model.attributes)
    },

  });

});

