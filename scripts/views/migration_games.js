define([
  'underscore',
  'backbone',
  'text!templates/migration_games.tpl',
  'views/migration_game_row',
  'vent',
  'config',
],
function(
  _,
  Backbone,
  Template,
  MigrationGameRowView,
  vent,
  config
)
{
  return Backbone.Marionette.CompositeView.extend(
  {
    template: _.template(Template),

    itemView: MigrationGameRowView,
    itemViewContainer: '.migration_games',

    events:
    {
    },

    className: "games-list-container"
  });
});

