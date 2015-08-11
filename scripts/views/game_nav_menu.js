define([
  'underscore',
  'backbone',
  'text!templates/game_nav_menu.tpl',
  'vent'
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
    template:  _.template(Template),

    events: {
      "click .settings":     "onClickSettings",
      "click .locations":    "onClickLocations",
      "click .quests":       "onClickQuests",
      "click .media":        "onClickMedia",
      "click .scenes":       "onClickScenes",
      "click .conversations":"onClickConversations",
      "click .sharing":      "onClickSharing",
      "click .tabs":         "onClickTabs",
      "click .groups":       "onClickGroups",
      "click .tags":         "onClickTags",
      "click .notes":        "onClickNotes",
    },

    initialize: function(options)
    {
      var view = this;

      vent.on("application:active_nav", function(tab_name)
      {
        view.options.active = tab_name;
        view.$el.find('li').removeClass("active");
        view.$el.find(tab_name).parent().addClass("active");
      });
    },

    // TODO replace all of these with controller actions
    //
    onRender: function() { this.$el.find(this.options.active).parent().addClass("active"); }, 
    onClickSettings: function() { Backbone.history.navigate("#games/"+this.model.get('game_id')+"/edit", {trigger: true}); }, 
    onClickSharing: function() { Backbone.history.navigate("#games/"+this.model.get('game_id')+"/share", {trigger: true}); }, 
    onClickTabs: function() { Backbone.history.navigate("#games/"+this.model.get('game_id')+"/tabs", {trigger: true}); }, 
    onClickGroups: function() { Backbone.history.navigate("#games/"+this.model.get('game_id')+"/groups", {trigger: true}); }, 
    onClickTags: function() { Backbone.history.navigate("#games/"+this.model.get('game_id')+"/tags", {trigger: true}); }, 
    onClickNotes: function() { Backbone.history.navigate("#games/"+this.model.get('game_id')+"/notes", {trigger: true}); }, 
    onClickLocations: function() { Backbone.history.navigate("#games/"+this.model.get('game_id')+"/locations", {trigger: true}); }, 
    onClickQuests: function() { Backbone.history.navigate("#games/"+this.model.get('game_id')+"/quests", {trigger: true}); },
    onClickMedia: function() { Backbone.history.navigate("#games/"+this.model.get('game_id')+"/media", {trigger: true}); },
    onClickScenes: function() { Backbone.history.navigate("#games/"+this.model.get('game_id')+"/scenes", {trigger: true}); },

    onClickConversations: function()
    {
      // FIXME quick fix for back navigation to same tab
      var scene_url = "#games/"+this.model.get('game_id')+"/conversations";

      if(window.location.hash === scene_url) {
        window.location.reload();
      }

      Backbone.history.navigate(scene_url, {trigger: true});
    }
  });
});

