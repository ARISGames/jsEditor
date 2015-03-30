define(function(require)
{
	var _                        = require('underscore');
	var Backbone                 = require('backbone');
	var Template                 = require('text!templates/scene_instance_trigger.tpl');
	var vent                     = require('vent');

	var Instance                 = require('models/instance');
	var Dialog                   = require('models/dialog');
	var Plaque                   = require('models/plaque');
	var Item                     = require('models/item');
	var WebPage                  = require('models/web_page');
	var Media                    = require('models/media');
	var Scene                    = require('models/scene');
	var Factory                  = require('models/factory');

	var DialogTriggerEditorView  = require('views/dialog_trigger_editor');
	var PlaqueTriggerEditorView  = require('views/plaque_trigger_editor');
	var ItemTriggerEditorView    = require('views/item_trigger_editor');
	var WebPageTriggerEditorView = require('views/web_page_trigger_editor');
	var SceneTriggerEditorView   = require('views/scene_trigger_editor');
	var FactoryTriggerEditorView = require('views/factory_trigger_editor');


	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		tagName: 'li',

		// Remove after upgrading to Marionette 2.0.x with `filter`
		className: function() {
			if(this.options.scene.get("scene_id") !== this.model.get("scene_id"))
			{
				return 'hidden'
			}
			return 'scene-trigger'
		},

		templateHelpers: function() {
			return {
				object_name: this.object_name,
				object_icon: this.object_icon,
				type_icon:   this.type_icon,
				type_color:  this.type_color
			}
		},

		initialize: function(options) {
			// Remove after upgrading to Marionette 2.0.x with `filter`
			if(this.model.get("scene_id") != this.options.scene.get("scene_id"))
			{
				this.render = function() {};
				return;
			}

			this.scene       = options.scene;
			this.instance    = this.model.instance();
			this.game_object = this.instance.game_object();

			// Assign icon and name from instance and game object
			this.loading_icon();
			this.update_icon ();

			// Listen to association events on on instance and game object
			this.bindModelEvents();
		},

		/* Model Event Binding */

		bindModelEvents: function() {
			this.listenTo(this.model,       "update",  this.update_icon);
			this.listenTo(this.game_object, "update",  this.update_icon);
			this.listenTo(this.game_object, "destroy", this.triggerRemove.bind(this));
		},

		triggerRemove: function() {
			// Alert parent they should remove me.
			this.trigger("trigger:remove", this.model);
		},


		/* Events */

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
			if(view.game_object instanceof Dialog ) { trigger_editor = new  DialogTriggerEditorView(options); }
			if(view.game_object instanceof Item   ) { trigger_editor = new    ItemTriggerEditorView(options); }
			if(view.game_object instanceof Plaque ) { trigger_editor = new  PlaqueTriggerEditorView(options); }
			if(view.game_object instanceof WebPage) { trigger_editor = new WebPageTriggerEditorView(options); }
			if(view.game_object instanceof Scene  ) { trigger_editor = new   SceneTriggerEditorView(options); }
			if(view.game_object instanceof Factory) { trigger_editor = new FactoryTriggerEditorView(options); }

			if(trigger_editor === null) {
				throw "No editor for "+view.game_object.idAttribute+": "+view.game_object.id;
			}
			else {
				vent.trigger("application:info:show", trigger_editor);
			}
		},


		/* Dom Helpers */

		loading_icon: function()
		{
			// FIXME delegate to different views for each object?
			this.object_name = "...";
			this.object_icon = "refresh";
			this.type_icon   = "question-sign";
			this.type_color  = "text-warning";

		},

		update_icon: function()
		{
			var type = this.model.get("type");
			if(type === "QR")        { this.type_icon = "qrcode";     }
			if(type === "LOCATION")  { this.type_icon = "map-marker"; }
			if(type === "IMMEDIATE") { this.type_icon = "link"; }

			this.type_color  = "text-primary";
			if(this.model.get("infinite_distance") === "1" && type === "LOCATION") { this.type_color = "text-success"; }

			type = this.instance.get("object_type");
			if(type === "DIALOG")   { this.object_icon = "comment"; }
			if(type === "PLAQUE")   { this.object_icon = "align-justify"; }
			if(type === "ITEM")     { this.object_icon = "stop";    }
			if(type === "WEB_PAGE") { this.object_icon = "globe";   }
			if(type === "SCENE")    { this.object_icon = "film";    }
			if(type === "FACTORY")  { this.object_icon = "home";    }

			this.object_name = this.game_object.get("name");

			this.render();
		}

	});
});
