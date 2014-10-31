define([
	'backbone',
	'text!templates/scene_chooser_row.tpl',
	'models/trigger',
	'models/instance',
	'vent'
], function(Backbone, Template, Trigger, Instance, vent) {

	return Backbone.Marionette.ItemView.extend({
		template: _.template(Template),

		// Bootstrap
		tagName: 'a',
		className: "list-group-item",


		events: {
			"click .new-instance": "onClickNewInstance",
		},


		// TODO how to bubble up? or get scene passed to us
		onClickNewInstance: function() {
			var trigger  = new Trigger  ({game_id: this.options.parent.get("game_id"), scene_id: this.options.parent.get("scene_id")});
			var instance = new Instance ({game_id: this.options.parent.get("game_id")});
			var scene   = this.model;

			// Scenes can only be immediate for now.
			trigger.set("type", "IMMEDIATE");

			// Save directly and insert into scene/show sidebar
			instance.set("object_id",   scene.id);
			instance.set("object_type", Instance.type_for(scene));

			instance.save({}, {
				success: function() {

					// Save Trigger
					trigger.set("instance_id", instance.id);

					trigger.set("title", Trigger.title_for(scene));

					trigger.save({},
					{
						create: function()
						{
							// FIXME better way to handle this?
							vent.trigger("scene:add_trigger", trigger);
							vent.trigger("application:popup:hide");
						}
					});
				}
			});
		}
	});
});

