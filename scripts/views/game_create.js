define([
  'underscore',
  'jquery',
  'backbone',
  'text!templates/game_create.tpl',
  'models/game',
  'util',
  'vent',
],
function(
  _,
  $,
  Backbone,
  Template,
  Game,
  util,
  vent
)
{
  return Backbone.Marionette.CompositeView.extend({
    template: _.template(Template),

    className: "games-list-container",

    ui: {
      "name": "#game-name",
      "description": "#game-description",
      "game_map_canvas": ".game-map-canvas",
    },

    onShow: function()
    {
      this.$el.find('input[autofocus]').focus();
    },

    events:
    {
      "click .save": "onClickSave",
      "click .cancel": "onClickCancel"
    },

    renderGameMap: function()
    {
      var self = this;

      var loc = new google.maps.LatLng(util.default_location().latitude, util.default_location().longitude);

      var map = new google.maps.Map(self.ui.game_map_canvas.get(0), {
        zoom:8,
        center:loc,
        scrollwheel:true,
        zoomControl:true,
      });
      var marker = new google.maps.Marker({
        position:loc,
        map:map,
        draggable:true,
      });

      google.maps.event.addListener(marker, 'dragend', 
        function(event)
        {
          var center = marker.position;
          self.model.set("latitude",  center.lat());
          self.model.set("longitude", center.lng());
          map.setCenter(center);
        }
      );

    },

    onRender: function()
    {
      var self = this;
      setTimeout(function() { self.renderGameMap(); }, 300);
    },

    onClickSave: function()
    {
      var view = this;

      this.model.set("name",        this.ui.name.val());
      this.model.set("description", this.ui.description.val());
      util.game_location = { latitude:parseFloat(this.model.get("latitude")), longitude:parseFloat(this.model.get("longitude")) };

      this.model.save({}, {
        create: function()
        {
          Backbone.history.navigate("#games/"+view.model.get('game_id')+"/scenes", {trigger: true});
        }
      });
    },

    onClickCancel: function()
    {
      if(window.location.hash === "#games") {
        window.location.reload();
      }
      Backbone.history.navigate("#games", {trigger: true});
    }

  });
});

