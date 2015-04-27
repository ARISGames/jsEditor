define([
	'backbone',
	'text!templates/item_chooser_row.tpl',
	'models/trigger',
	'models/instance',
	'vent',
	'storage'
], function(Backbone, Template, Trigger, Instance, vent, storage) {

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
			var item     = this.model;

			// Save directly and insert into scene/show sidebar
			instance.set("object_id",   item.id);
			instance.set("object_type", Instance.type_for(item));

			// Quantity default for item.
			instance.set("infinite_qty", "1");
			instance.set("qty", "1");

			instance.save({}, {
				create: function() {
					storage.add_game_object(instance);

					// Save Trigger
					trigger.set("instance_id", instance.id);

					trigger.save({},
					{
						create: function()
						{
							storage.add_game_object(trigger);
							vent.trigger("application:popup:hide");
						}
					});
				}
			});
		}
	});
});

