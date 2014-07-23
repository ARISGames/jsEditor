define([
	'underscore',
	'backbone',
	'text!templates/scene_instance_trigger.tpl',
	'models/instance',
	'models/dialog',
	'views/dialog_trigger_editor',
	'vent'
], function(_, Backbone, Template, Instance, Dialog, DialogTriggerEditorView, vent) {

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

			// FIXME delegate to different views for each
			view.object_name = "...";
			view.object_icon = "refresh";
			view.type_icon   = "question-sign";

			var type = view.model.get("type");
			if(type === "QR")        { view.type_icon = "qrcode";     }
			if(type === "LOCATION")  { view.type_icon = "map-marker"; }
			if(type === "IMMEDIATE") { view.type_icon = "flash"; }

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
							if(type === "PLAQUE")   { view.object_icon = "list-alt"; }
							if(type === "ITEM")     { view.object_icon = "inbox";    }
							if(type === "WEB_PAGE") { view.object_icon = "globe";    }

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
			// launch based on type
			if(this.game_object instanceof Dialog) {
				var trigger_editor = new DialogTriggerEditorView({scene: this.scene, dialog: this.game_object, instance: this.instance, model: this.model, visible_fields: "trigger"});
				vent.trigger("application:info:show", trigger_editor);
			}
		}

	});
});
