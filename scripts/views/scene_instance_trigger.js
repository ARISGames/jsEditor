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
	'views/dialog_trigger_editor',
	'views/plaque_trigger_editor',
	'views/item_trigger_editor',
	'views/web_page_trigger_editor',
	'views/scene_trigger_editor',
	'vent'
], function(_, Backbone, Template, Instance, Dialog, Plaque, Item, WebPage, Media, Scene, DialogTriggerEditorView, PlaqueTriggerEditorView, ItemTriggerEditorView, WebPageTriggerEditorView, SceneTriggerEditorView, vent) {

	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		tagName: 'li',
		className: 'scene-trigger',

		templateHelpers: function() {
			return {
				object_name: this.object_name,
				object_icon: this.object_icon,
				type_icon:   this.type_icon
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
							if(type === "DIALOG")   { view.object_icon = "comment";  }
							if(type === "PLAQUE")   { view.object_icon = "align-justify"; }
							if(type === "ITEM")     { view.object_icon = "stop";    }
							if(type === "WEB_PAGE") { view.object_icon = "globe";    }
							if(type === "SCENE")    { view.object_icon = "film";     }

							view.render();
						});

						view.game_object.fetch({
							success: function() {

								// FIXME need global instance
								vent.on("game_object:update", function(game_object) {
									if(game_object.id === view.game_object.id && game_object.idAttribute === view.game_object.idAttribute) {
										view.game_object = game_object;
										view.object_name = game_object.get("name");
										view.render();
									}
								});

								vent.on("game_object:delete", function(game_object) {
									if(game_object.id === view.game_object.id && game_object.idAttribute === view.game_object.idAttribute) {
										view.trigger("trigger:remove", view.model);
									}
								});
							}
						});
					} // try load game object
					catch(error) {
						console.error(error);
					}
				}
			});

		},

		onRender: function() {
			$(this.$el).draggable({ containment: "parent" });
		},

		events: {
			"click .show": "onClickShow"
		},

		onClickShow: function() {
			var view = this;

			var icon = new Media({media_id: this.model.get("icon_media_id")});
			icon.fetch({
				success: function() {
					var trigger_editor = null;

					// launch based on type
					if(view.game_object instanceof Dialog) {
						trigger_editor = new DialogTriggerEditorView({scene: view.scene, icon: icon, dialog: view.game_object, instance: view.instance, model: view.model, visible_fields: "trigger"});
					}

					if(view.game_object instanceof Item) {
						trigger_editor = new ItemTriggerEditorView({scene: view.scene, icon: icon, item: view.game_object, instance: view.instance, model: view.model, visible_fields: "trigger"});
					}
					if(view.game_object instanceof Plaque) {
						trigger_editor = new PlaqueTriggerEditorView({scene: view.scene, icon: icon, plaque: view.game_object, instance: view.instance, model: view.model, visible_fields: "trigger"});
					}

					if(view.game_object instanceof WebPage) {

						trigger_editor = new WebPageTriggerEditorView({scene: view.scene, icon: icon, web_page: view.game_object, instance: view.instance, model: view.model, visible_fields: "trigger"});
					}

					if(view.game_object instanceof Scene) {

						trigger_editor = new SceneTriggerEditorView({parent_scene: view.scene, icon: icon, scene: view.game_object, instance: view.instance, model: view.model, visible_fields: "trigger"});
					}

					if(trigger_editor === null) {
						throw "No editor for "+view.game_object.idAttribute+": "+view.game_object.id;
					}
					else {
						vent.trigger("application:info:show", trigger_editor);
					}
				}
			});
		}

	});
});
