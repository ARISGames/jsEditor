define([
	'underscore',
	'backbone',
	'text!templates/scene_instance_trigger.tpl',
	'models/instance',
	'models/dialog',
	'models/plaque',
	'models/item',
	'models/web_page',
	'models/media',
	'models/scene',
	'models/factory',
	'views/dialog_trigger_editor',
	'views/plaque_trigger_editor',
	'views/item_trigger_editor',
	'views/web_page_trigger_editor',
	'views/scene_trigger_editor',
	'views/factory_trigger_editor',
	'vent'
], function(_, Backbone, Template, Instance, Dialog, Plaque, Item, WebPage, Media, Scene, Factory, DialogTriggerEditorView, PlaqueTriggerEditorView, ItemTriggerEditorView, WebPageTriggerEditorView, SceneTriggerEditorView, FactoryTriggerEditorView, vent) {

	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		tagName: 'li',
		className: 'scene-trigger',

		templateHelpers: function() {
			return {
				object_name: this.object_name,
				object_icon: this.object_icon,
				type_icon:   this.type_icon,
				type_color:  this.type_color
			}
		},

		initialize: function(options) {
			this.scene = options.scene;

			var view = this;

			vent.on("trigger:update", function(trigger) {
				if(trigger.id === view.model.id) {
					view.model = trigger;

					// FIXME refactor double logic
					var type = view.model.get("type");
					if(type === "QR")        { view.type_icon = "qrcode";     }
					if(type === "LOCATION")  { view.type_icon = "map-marker"; }
					if(type === "IMMEDIATE") { view.type_icon = "link"; }

					view.type_color  = "text-primary";
					if(trigger.get("infinite_distance") === "1" && type === "LOCATION") { view.type_color = "text-success"; }

					view.render();
				}
			});

			vent.on("scenes:remove", function(scene) {
				if(view.instance.get("object_type") === "SCENE" && scene.id === view.game_object.id)
				{
					view.trigger("trigger:remove", view.model);
				}
			});

			// FIXME delegate to different views for each
			view.object_name = "...";
			view.object_icon = "refresh";
			view.type_icon   = "question-sign";

			var type = view.model.get("type");
			if(type === "QR")        { view.type_icon = "qrcode";     }
			if(type === "LOCATION")  { view.type_icon = "map-marker"; }
			if(type === "IMMEDIATE") { view.type_icon = "link"; }

			view.type_color  = "text-primary";
			if(view.model.get("infinite_distance") === "1" && type === "LOCATION") { view.type_color = "text-success"; }

			view.instance = new Instance({instance_id: view.model.get("instance_id")});
			view.instance.fetch({
				success: function() {

					try {
						var object_class = view.instance.object_class();
						view.game_object = new object_class();
						view.game_object.set(view.game_object.idAttribute, view.instance.get("object_id"));

						// FIXME refer to global instance of object so change happens everywhere
						view.game_object.on("change", function() {
							view.object_name = view.game_object.get("name");

							var type = view.instance.get("object_type");
							if(type === "DIALOG")   { view.object_icon = "comment"; }
							if(type === "PLAQUE")   { view.object_icon = "align-justify"; }
							if(type === "ITEM")     { view.object_icon = "stop";    }
							if(type === "WEB_PAGE") { view.object_icon = "globe";   }
							if(type === "SCENE")    { view.object_icon = "film";    }
							if(type === "FACTORY")  { view.object_icon = "home";    }

							view.render();
						});

						view.game_object.fetch({
							success: function() {

								// FIXME need global instance
								vent.on("game_object:update", function(game_object) {
									if(game_object.is(view.game_object))
									{
										view.game_object = game_object;
										view.object_name = game_object.get("name");
										view.render();
									}
								});

								vent.on("game_object:delete", function(game_object) {
									if(game_object.is(view.game_object))
									{
										view.trigger("trigger:remove", view.model);
									}
								});
							}
						});
					} // try load game object
					catch(error) {
						console.error("Scene Trigger Fetch Error", error);
					}
				}
			});

		},

		events: {
			"click .show": "onClickShow"
		},

		onClickShow: function() {
			var view = this;
			var trigger_editor = null;

			var options = {
				scene: view.scene,
				game_object: view.game_object,
				instance: view.instance,
				model: view.model,
				visible_fields: "trigger"
			};

			// launch based on type
			if(view.game_object instanceof Dialog ) { trigger_editor = new DialogTriggerEditorView(options);  }
			if(view.game_object instanceof Item   ) { trigger_editor = new ItemTriggerEditorView(options);    }
			if(view.game_object instanceof Plaque ) { trigger_editor = new PlaqueTriggerEditorView(options);  }
			if(view.game_object instanceof WebPage) { trigger_editor = new WebPageTriggerEditorView(options); }

			if(view.game_object instanceof Scene)
			{
				trigger_editor = new SceneTriggerEditorView({parent_scene: view.scene, scene: view.game_object, instance: view.instance, model: view.model, visible_fields: "trigger"});
			}

			if(view.game_object instanceof Factory)
			{
				trigger_editor = new FactoryTriggerEditorView({scene: view.scene, factory: view.game_object, instance: view.instance, model: view.model, visible_fields: "trigger"});
			}

			if(trigger_editor === null) {
				throw "No editor for "+view.game_object.idAttribute+": "+view.game_object.id;
			}
			else {
				vent.trigger("application:info:show", trigger_editor);
			}
		}

	});
});
