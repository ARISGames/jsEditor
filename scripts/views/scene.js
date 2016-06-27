define([
  'underscore',
  'backbone',
  'text!templates/scene.tpl',
  'views/scene_editor',
  'views/scene_instance_trigger',
  'views/scene_trigger_type_chooser',
  'views/empty_scene',
  'collections/triggers',
  'vent',
],
function(
  _,
  Backbone,
  Template,
  SceneEditorView,
  SceneInstanceTriggerView,
  SceneTriggerTypeChooserView,
  EmptySceneView,
  TriggerCollection,
  vent
)
{
  return Backbone.Marionette.CompositeView.extend(
  {
    template: _.template(Template),

    className: function()
    {
      var self = this;
      var panel_color = "default";

      if(self.is_intro_scene()) { panel_color = "info"; }

      return "panel panel-"+panel_color+" scene-panel"
    },

    itemView: SceneInstanceTriggerView,
    itemViewContainer: ".scene-triggers",
    itemViewOptions: function(model, index)
    {
      var self = this;
      return { scene:self.model };
    },

    emptyView: EmptySceneView,

    templateHelpers: function()
    {
      var self = this;
      return { is_intro_scene: self.is_intro_scene() };
    },

    initialize: function(options)
    {
      var self = this;

      // Track to adjust intro scene
      self.listenTo(self.model.game(), "change:intro_scene_id", self.onChangeIntroScene.bind(self));
      self.listenTo(self.model, "update", self.render);
    },

    is_intro_scene: function()
    {
      // FIXME can just compare models if we load all scenes into storage.
      var self = this;
      return self.model.id === self.model.game().get("intro_scene_id");
    },

    onChangeIntroScene: function()
    {
      var self = this;
      self.render();

      if(self.is_intro_scene())
      {
        self.$el.removeClass("panel-default").addClass("panel-info");
      }
      else
      {
        self.$el.removeClass("panel-info").addClass("panel-default");
      }
    },

    /* Listen to children asking to be removed */
    onItemviewTriggerRemove: function(item_view, trigger)
    {
      var self = this;
      self.collection.remove(trigger);
    },

    events:
    {
      "click .name": "onClickName",
      "click .new-trigger": "onClickNewTrigger"
    },

    onRender: function()
    {
      var self = this;
      var el = $(self.$el);
      el.draggable({ containment: 'parent', stack: '.panel' });
      var left = parseInt(self.model.get('editor_x'));
      var top = parseInt(self.model.get('editor_y'));
      el.css({
        left: left,
        top: top,
        position: 'absolute',
      });
      el.on('dragstop', function(){
        var posn = el.position();
        self.model.set('editor_x', posn.left);
        self.model.set('editor_y', posn.top);
        self.model.save();
      });
    },

    onClickName: function()
    {
      var self = this;
      vent.trigger("application:info:show", new SceneEditorView({model: self.model}));
    },

    onClickNewTrigger: function()
    {
      var self = this;
      vent.trigger("application:popup:show", new SceneTriggerTypeChooserView({model:self.model, game:self.model.game()}), "Add Trigger to Scene");
    },

  });
});

