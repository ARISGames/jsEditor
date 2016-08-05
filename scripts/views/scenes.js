define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/scenes.tpl',
  'jquidrag',
  'bootstrap',
  'views/scene',
  'views/scene_editor',
  'models/scene',
  'collections/triggers',
  'storage',
  'vent',
],
function(
  $,
  _,
  Backbone,
  Template,
  jQueryUiDraggable,
  Bootstrap,
  SceneView,
  SceneEditorView,
  Scene,
  TriggersCollection,
  storage,
  vent
)
{
  return Backbone.Marionette.CompositeView.extend(
  {
    template: _.template(Template),

    itemView: SceneView,
    itemViewContainer: ".scenes-inner",
    itemViewOptions: function(model, index)
    {
      var self = this;
      return { collection: self.triggers };
    },

    className: 'full-height',

    events:
    {
      "click .new-scene": "onClickNewScene"
    },

    initialize: function(options)
    {
      var self = this;

      self.intro_scene = storage.scenes.get(storage.game.get("intro_scene_id"));
      self.triggers    = storage.triggers;

      // This fails with undefined when .fetch is passed without a closure.
      self.listenTo(self.collection, "remove", function() { self.model.fetch()});

      self.sceneLinks = false;
    },

    onClickNewScene: function()
    {
      var self = this;
      var scene = new Scene({game_id:self.model.id});
      vent.trigger("application:popup:show", new SceneEditorView({model:scene}), "Add Scene");
    },

    /* Line Drawing Code */

    getPos: function(ele, targetParent)
    {
      var x=0;
      var y=0;
      while(true){
        x += ele.offsetLeft;
        y += ele.offsetTop;
        if(ele.offsetParent === null || ele.offsetParent === targetParent){
          break;
        }
        ele = ele.offsetParent;
      }
      return [x, y];
    },

    onRender: function()
    {
      var self = this;

      var scene_container = self.$el.find('.scenes');
      var link_container = self.$el.find('.scenes-links');
      self.resizer = function(){
        self.drawLinks(scene_container, link_container);
      };

      self.$el.on('drag', self.resizer);
      $(window).on('resize', self.resizer);
      self.$el.find('.scenes-inner').on('scroll', self.resizer);
      self.resizerID = setInterval(self.resizer, 1000);

      var linksCheckbox = self.$el.find('.view-links-checkbox');
      self.$el.find('.view-links-button').on('click', function(){
        if (self.sceneLinks) {
          linksCheckbox.prop('checked', false);
          self.sceneLinks = false;
          $(link_container).hide();
        } else {
          linksCheckbox.prop('checked', true);
          self.sceneLinks = true;
          $(link_container).show();
        }
      });

      self.$el.find('.scenes-inner').draggable();
    },

    onClose: function()
    {
      var self = this;
      self.$el.off('drag', self.resizer);
      $(window).off('resize', self.resizer);
      self.$el.find('.scenes-inner').off('scroll', self.resizer);
      clearInterval(self.resizerID);
    },

    drawLinks: function(scene_container, link_container)
    {
      var self = this;
      if (!self.sceneLinks) return;

      link_container.empty();
      var link_starts = $(scene_container).find('.link-to-scene');
      var link_end = $(scene_container).find('.scene-title');
      var link_ends = {};
      link_end.each(function(index, link_end){
        link_ends[$(link_end).attr('data-scene-id')] = link_end;
      })
      var posn_svg = $(link_container).offset();
      var link_html = '';
      var posn_start, posn_end, x1, y1, x2, y2;
      var compare = function(a, b) {
        if (a == b) return 'EQ';
        if (a <  b) return 'LT';
        if (a >  b) return 'GT';
      }
      link_starts.each(function(index, link_start){
        var scene_id = $(link_start).attr('data-link-scene-id');
        var link_end = link_ends[scene_id];
        posn_start = $(link_start).offset()
        posn_end = $(link_end).offset()
        var points;
        var point_start      = {x: posn_start.left - posn_svg.left    , y: posn_start.top - posn_svg.top + 55};
        var point_end        = {x: posn_end.left   - posn_svg.left - 8, y: posn_end.top   - posn_svg.top - 4 };
        var point_turnaround = {x: posn_start.left - posn_svg.left    , y: posn_start.top - posn_svg.top + 80};
        switch ( compare(point_turnaround.x, point_end.x - 25) + ',' + compare(point_turnaround.y, point_end.y) ) {
          case 'EQ,LT':
            // end is down: go down
            points = [point_start, point_end];
            break;
          case 'EQ,EQ':
          case 'LT,LT':
            // end is down-right: go down, right
            points = [point_start, {x: point_start.x, y: point_end.y}, point_end];
            break;
          case 'EQ,GT':
            // end is up: go down, left, up, right
          case 'GT,EQ':
            // end is left: go down, left, up, right
          case 'GT,GT':
            // end is up-left: go down, left, up, right
          case 'GT,LT':
            // end is down-left: go down, left, down, right
          case 'LT,EQ':
            // end is right: go down, right, up, right
          case 'LT,GT':
            // end is up-right: go down, right, up, right
            points =
              [ point_start
              , point_turnaround
              , {x: point_end.x - 25, y: point_turnaround.y}
              , {x: point_end.x - 25, y: point_end.y}
              , point_end
              ];
            break;
        }
        for (var i = 0; i < points.length - 1; i++) {
          x1 = points[i  ].x;
          y1 = points[i  ].y;
          x2 = points[i+1].x;
          y2 = points[i+1].y;
          link_html += '<line class="scenes-link" x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" />';
        }
      });

      link_container.html(link_html);
    }

  });
});

