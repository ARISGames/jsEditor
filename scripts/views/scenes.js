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

      self.$el.find('.scenes-inner').draggable({
        drag: function(event, ui) {
          // don't allow moving past the top-left corner
          ui.position.left = Math.min(0, ui.position.left);
          ui.position.top  = Math.min(0, ui.position.top );
        },
      });
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
      var distance = function(p1, p2) {
        // speed hack because this is only for points on an orthogonal line
        return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
      }
      link_starts.each(function(index, link_start){
        var scene_id = $(link_start).attr('data-link-scene-id');
        var link_end = link_ends[scene_id];
        var posn_start = $(link_start).offset()
        var posn_end = $(link_end).offset()
        // first, figure out the points we're gonna draw a line between
        var points;
        var point_start      = {x: posn_start.left - posn_svg.left    , y: posn_start.top - posn_svg.top + 55};
        var point_end        = {x: posn_end.left   - posn_svg.left - 6, y: posn_end.top   - posn_svg.top +  2};
        var point_turnaround = {x: posn_start.left - posn_svg.left    , y: posn_start.top - posn_svg.top + 80};
        if (point_turnaround.x <= point_end.x - 25 && point_turnaround.y <= point_end.y) {
          points =
            [ point_start
            , {x: point_start.x, y: point_end.y}
            , point_end
            ];
        } else {
          points =
            [ point_start
            , point_turnaround
            , {x: point_end.x - 25, y: point_turnaround.y}
            , {x: point_end.x - 25, y: point_end.y}
            , point_end
            ];
          }
        // next, compute the curve radius for each turn
        var curves = [];
        for (var i = 1; i < points.length - 1; i++) {
          var far1  = points[i - 1];
          var point = points[i];
          var far2  = points[i + 1];
          curves[i] = Math.min(10, Math.min(distance(far1, point), distance(point, far2)) / 2);
        }
        var x1, y1, x2, y2;
        for (var i = 0; i < points.length - 1; i++) {
          x1 = points[i  ].x;
          y1 = points[i  ].y;
          x2 = points[i+1].x;
          y2 = points[i+1].y;
          if (i !== 0) {
            // shorten start point for curve
            if (x1 < x2) x1 += curves[i];
            if (x1 > x2) x1 -= curves[i];
            if (y1 < y2) y1 += curves[i];
            if (y1 > y2) y1 -= curves[i];
          }
          if (i !== points.length - 2) {
            // shorten end point for curve
            if (x1 < x2) x2 -= curves[i+1];
            if (x1 > x2) x2 += curves[i+1];
            if (y1 < y2) y2 -= curves[i+1];
            if (y1 > y2) y2 += curves[i+1];
          }
          link_html += '<line class="scenes-link" x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" />';
        }
        for (var i = 1; i < curves.length; i++) {
          var far1  = points[i - 1];
          var point = points[i];
          var far2  = points[i + 1];
          var radius = curves[i];
          var p1, p2, dir1, dir2;
          // URDL = 0123
          if (far1.x < point.x) { p1 = {x: point.x - radius, y: point.y}; dir1 = 1; }
          if (far1.x > point.x) { p1 = {x: point.x + radius, y: point.y}; dir1 = 3; }
          if (far1.y < point.y) { p1 = {x: point.x, y: point.y - radius}; dir1 = 2; }
          if (far1.y > point.y) { p1 = {x: point.x, y: point.y + radius}; dir1 = 0; }
          if (point.x < far2.x) { p2 = {x: point.x + radius, y: point.y}; dir2 = 1; }
          if (point.x > far2.x) { p2 = {x: point.x - radius, y: point.y}; dir2 = 3; }
          if (point.y < far2.y) { p2 = {x: point.x, y: point.y + radius}; dir2 = 2; }
          if (point.y > far2.y) { p2 = {x: point.x, y: point.y - radius}; dir2 = 0; }
          // if the we're making a right turn, e.g. up then right, sweep is 1
          var sweep = ((dir1 + 1) % 4 === dir2) ? 1 : 0;
          link_html += '<path class="scenes-link" fill-opacity="0" d="M '+p1.x+' '+p1.y+' A '+radius+' '+radius+' 0 0 '+sweep+' '+p2.x+' '+p2.y+' "/>';
        }
        link_html += '<circle cx="'+points[0].x+'" cy="'+points[0].y+'" r="5" fill="rgb(101,184,34)" />';
        var p = points[points.length - 1];
        link_html += '<path d="M '+(p.x-4)+' '+(p.y-8)+' L '+(p.x-4)+' '+(p.y+8)+' L '+(p.x+4)+' '+(p.y)+' Z" fill="rgb(101,184,34)" />';
      });

      link_container.html(link_html);
    }

  });
});

