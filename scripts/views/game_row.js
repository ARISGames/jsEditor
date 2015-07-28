define([
  'underscore',
  'underscore.string',
  'backbone',
  'text!templates/game_row.tpl',
],
function(
  _,
  _S,
  Backbone,
  Template
)
{
  return Backbone.Marionette.ItemView.extend(
  {
    template: _.template(Template),

    // Bootstrap
    tagName: 'a',
    className: "list-group-item clearfix",

    initialize: function(options)
    {
      this.listenTo(this.model.icon(), 'change', this.render);
    },

    templateHelpers: function()
    {
      return {
        icon_thumb_url: this.model.icon_thumbnail()
      }
    },

    events:
    {
      "click": "onClickShow"
    },

    onClickShow: function()
    {
      // Fixme, move into own module for migration managing
      if(window.running_migrations && Object.keys(window.running_migrations).length > 0) {
        alert(window.onbeforeunload.call());
        return;
      }

      // TODO Move this to an event ie gamelist.game.clicked
      Backbone.history.navigate("#games/"+this.model.get('game_id')+"/scenes", {trigger: true});
    }
  });
});
