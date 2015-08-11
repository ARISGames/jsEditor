define([
  'underscore',
  'jquery',
  'backbone',
  'text!templates/group_editor.tpl',
  'text!images/phone-grid.svg',
  'text!images/phone-list.svg',
  'models/game',
  'models/group',
  'vent',
],
function(
  _,
  $,
  Backbone,
  Template,
  PhoneGridSVG,
  PhoneListSVG,
  Game,
  group,
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
        icon_thumbnail_url:  this.model.icon_thumbnail(),
        parent_name: this.parent_name(),
        option_selected: function(boolean_statement) { return boolean_statement ? "selected" : ""; },
        radio_selected: function(boolean_statement) { return boolean_statement ? "checked" : ""; },
        phone_grid_svg: PhoneGridSVG,
        phone_list_svg: PhoneListSVG,
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

