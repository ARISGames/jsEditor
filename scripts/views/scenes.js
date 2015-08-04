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
  vent
)
{
  return Backbone.Marionette.CompositeView.extend(
  {
    template: _.template(Template),

    itemView: SceneView,
    itemViewContainer: ".scenes",
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

      self.intro_scene = options.intro_scene;
      self.triggers    = options.triggers;
      console.log(self.triggers);

      // This fails with undefined when .fetch is passed without a closure.
      self.listenTo(self.collection, "remove", function() { view.model.fetch()});
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
      // make draggable
      //$(self.$el.find(".scene")).draggable({ containment: "parent" });
      //$(self.$el.find(".scene-item")).draggable({ containment: "parent", delay: 100 });

      var scene_container = self.$el.find('.scenes').get(0);
      var link_ends   = self.$el.find('.link-end'  );
      var link_starts = self.$el.find('.link-start');
      var link_lines  = self.$el.find('.link-line' );

      self.$el.find(".link-end, .link-start, .scene").on("drag", function(event, ui)
      {
        //self.drawLinks(link_starts, link_ends, link_lines, scene_container);
      });

      //setTimeout(function(){ self.drawLinks(link_starts, link_ends, link_lines, scene_container); },100);
    },

    drawLinks: function(link_starts, link_ends, link_lines, scene_container)
    {
      var self = this;

      link_starts.each(function(index, link_start)
      {
        var end_pos   = self.getPos( link_ends.get(index), scene_container );
        var start_pos = self.getPos( link_start,           scene_container );

        $(link_lines.get(index)).attr("d", "M" + (start_pos[0] + 37) + " " + (start_pos[1] + 27) + " L" + (end_pos[0] + 37) + " " + (end_pos[1] + 27));
      });
    }

  });
});

