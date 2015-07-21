define([
  'underscore',
  'backbone',
  'text!templates/user_nav_menu.tpl',
  'models/session',
  'vent'
],
function(
  _,
  Backbone,
  Template,
  session,
  vent
)
{
  return Backbone.Marionette.ItemView.extend({
    template:  _.template(Template),

    templateHelpers: function() {
      return {
        username: session.username()
      };
    },

    events: {
      "click .logout": "onClickLogout",
      "click .games":  "onClickGames"
    },

    onClickLogout: function() {
      // just listen for event on session
      session.logout();
    },

    onClickGames: function() {
      Backbone.history.navigate("#games", {trigger: true});
    }
  });
});

