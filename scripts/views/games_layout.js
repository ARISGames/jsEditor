define(
function(require)
{
  var _          = require('underscore');
  var Backbone   = require('backbone');
  var Marionette = require('marionette');
  var Template   = require('text!templates/games_layout.tpl');

  return Backbone.Marionette.Layout.extend({
    template: _.template(Template),

    className: "games-list-container",

    regions: {
      games: ".games_region",
      migration_games: ".migration_games_region"
    }
  });
});

