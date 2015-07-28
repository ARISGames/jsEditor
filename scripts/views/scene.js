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
      var panel_color = "default";

      if(this.is_intro_scene())
      {
        panel_color = "info";
      }

      return "panel panel-"+panel_color+" scene-panel"
    },

    itemView: SceneInstanceTriggerView,
    itemViewContainer: ".scene-triggers",
    itemViewOptions: function(model, index)
    {
      return {
        scene: this.model
      }
    },

    emptyView: EmptySceneView,

    templateHelpers: function()
    {
      return {
        is_intro_scene: this.is_intro_scene()
      }
    },

    initialize: function(options)
    {
      var view = this;

      // Track to adjust intro scene
      this.listenTo(this.model.game(), "change:intro_scene_id", this.onChangeIntroScene.bind(this));
      this.listenTo(this.model, "update", this.render);
    },

    is_intro_scene: function()
    {
      // FIXME can just compare models if we load all scenes into storage.
      return this.model.id === this.model.game().get("intro_scene_id");
    },

    onChangeIntroScene: function()
    {
      this.render();

      if(this.is_intro_scene())
      {
        this.$el.removeClass("panel-default").addClass("panel-info");
      }
      else
      {
        this.$el.removeClass("panel-info").addClass("panel-default");
      }
    },

    /* Listen to children asking to be removed */
    onItemviewTriggerRemove: function(item_view, trigger)
    {
      this.collection.remove(trigger);
    },

    events:
    {
      "click .name": "onClickName",
      "click .new-trigger": "onClickNewTrigger"
    },

    onRender: function()
    {
      $(this.$el).draggable({ containment: "parent" });
    },

    onClickName: function()
    {
      vent.trigger("application:info:show", new SceneEditorView({model: this.model}));
    },

    onClickNewTrigger: function()
    {
      vent.trigger("application:popup:show", new SceneTriggerTypeChooserView({model: this.model, game: this.model.game()}), "Add Trigger to Scene");
    },

  });
});

