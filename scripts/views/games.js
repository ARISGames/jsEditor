define([
  'underscore',
  'backbone',
  'text!templates/games.tpl',
  'views/game_row',
  'views/game_create',
  'vent',
  'config',
],
function(
  _,
  Backbone,
  Template,
  GameRowView,
  GameCreateView,
  vent,
  config
)
{
  return Backbone.Marionette.ItemView.extend(
  {
    template: _.template(Template),

    itemView:GameRowView,
    itemViewContainer:'.games',

    initialize: function()
    {
      var self = this;
          
      self.collection = getUserGames;
    },

    getUserGames: function()
    {
      var user_games = [];
      var games = app_model.games.members;
      var user_game_pairs = app_model.user_games.getAllMatching("user_id",aris_session.user_id);
      for(var i = 0; i < games.length; i++)
        for(var j = 0; j < user_game_pairs.length; j++)
          if(games[i].game_id = user_game_paris[j].game_id) user_games.push(games[i]);

      return user_games;
    }

    events:
    {
      "click .new": "onClickNew"
    },

    onClickNew: function()
    {
      if(window.running_migrations && Object.keys(window.running_migrations).length > 0)
      {
        alert(window.onbeforeunload.call());
        return;
      }

      var game = new Game();
      vent.trigger("application.show", new GameCreateView({model: game}));
    },

    // Marionette override
    appendBuffer: function(compositeView, buffer)
    {
      var $container = this.getItemViewContainer(compositeView);
      $container.find(".foot").before(buffer);
    },

    appendHtml: function(compositeView, itemView, index)
    {
      if (compositeView.isBuffering) {
        compositeView.elBuffer.appendChild(itemView.el);
      }
      else {
        // If we've already rendered the main collection, just
        // append the new items directly into the element.
        var $container = this.getItemViewContainer(compositeView);
        $container.find(".foot").before(itemView.el);
      }
    }
  });
});
