define([
  'underscore',
  'backbone',
  'marionette',
  'text!templates/games_layout.tpl',
],
function(
  _,
  Backbone,
  Marionette,
  Template
)
{
  return Backbone.Marionette.Layout.extend(
  {
    template: _.template(Template),

    className: "games-list-container",

    regions: {
      games: ".games_region",
      migration_games: ".migration_games_region"
    }
  });
});

