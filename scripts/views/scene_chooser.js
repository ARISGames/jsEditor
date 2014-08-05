define([
	'backbone',
	'text!templates/scene_chooser.tpl',
	'models/scene',
	'models/trigger',
	'models/instance',
	'models/media',
	'views/scene_chooser_row',
	'views/scene_trigger_editor',
	'vent'
], function(Backbone, Template, Scene, Trigger, Instance, Media, SceneChooserRowView, SceneTriggerEditorView, vent) {

	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		itemView: SceneChooserRowView,
		itemViewContainer: ".scenes",

		itemViewOptions: function(model, index) {
			return {
			  parent: this.options.parent
			}
		},

		events: {
			"click .new-scene": "onClickNewScene"
		},

		/* TODO move complex sets like this into a controller */
		onClickNewScene: function() {
			var scene    = new Scene    ({game_id: this.options.parent.get("game_id")});
			var trigger  = new Trigger  ({game_id: this.options.parent.get("game_id"), scene_id: this.options.parent.get("scene_id")});
			var instance = new Instance ({game_id: this.options.parent.get("game_id")});

			// Do not need fetches since we are 'new'
			var icon     = new Media    ({media_id: trigger.get("icon_media_id")});

			var trigger_editor = new SceneTriggerEditorView({parent_scene: this.options.parent, icon: icon, scene: scene, instance: instance, model: trigger, visible_fields: "create_scene_with_trigger"});
			vent.trigger("application:popup:show", trigger_editor, "Add Scene to Scene");
		},

		// Marionette override
		appendBuffer: function(compositeView, buffer) {
			var $container = this.getItemViewContainer(compositeView);
			$container.find(".foot").before(buffer);
		},

		appendHtml: function(compositeView, sceneView, index){
			if (compositeView.isBuffering) {
			  compositeView.elBuffer.appendChild(sceneView.el);
			}
			else {
			  // If we've already rendered the main collection, just
			  // append the new scenes directly into the element.
			  var $container = this.getItemViewContainer(compositeView);
			  $container.find(".foot").before(sceneView.el);
			}
		}

	});
});
