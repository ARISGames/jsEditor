define([
  'underscore',
  'backbone',
  'text!templates/games.tpl',
  'views/game_row',
  'views/game_create',
  'models/game',
  'vent',
  'config',
],
function(
  _,
  Backbone,
  Template,
  GameRowView,
  GameCreateView,
  Game,
  vent,
  config
)
{
  return Backbone.Marionette.CompositeView.extend(
  {
    template: _.template(Template),

    itemView: GameRowView,
    itemViewContainer: '.games',

    events: {
      "click .new": "onClickNew"
    },

    onClickNew: function() {
      if(window.running_migrations && Object.keys(window.running_migrations).length > 0) {
        alert(window.onbeforeunload.call());
        return;
      }

      var game = new Game();
      vent.trigger("application.show", new GameCreateView({model: game}));
    },

    // Marionette override
    appendBuffer: function(compositeView, buffer) {
      var $container = this.getItemViewContainer(compositeView);
      $container.find(".foot").before(buffer);
    },

    appendHtml: function(compositeView, itemView, index){
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
