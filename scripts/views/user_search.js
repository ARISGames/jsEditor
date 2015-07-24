define([
  'underscore',
  'backbone',
  'text!templates/user_search.tpl',
  'models/user_search',
  'vent'
],
function(
  _,
  Backbone,
  Template,
  UserSearch,
  vent
)
{
  return Backbone.Marionette.CompositeView.extend({
    template: _.template(Template),

    ui:
    {
      "search" : "#user-search"
    },

    events:
    {
      "click .add": "onClickAdd",
      "keydown @ui.search": "onChangeSearch"
    },

    onShow: function() {
      this.$el.find('input[autofocus]').focus();
    },

    onChangeSearch: function() {
      vent.trigger("application:alert:hide");
    },

    onClickAdd: function() {
      var view = this;

      var user_search = new UserSearch({search: this.ui.search.val()});

      user_search.fetch({
        success: function() {
          view.trigger("add", user_search);
        },

        amf_error: function(code, message) {
          vent.trigger("application:alert", {text: message});
        }
      });
    }
  });
});

