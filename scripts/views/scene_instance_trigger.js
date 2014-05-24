define([
	'underscore',
	'backbone',
	'text!../../templates/scene_instance_trigger.tpl',
	'models/instance',
	'models/dialog',
	'vent'
], function(_, Backbone, Template, Instance, Dialog, vent) {

	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		tagName: 'li',
		className: 'scene-item',

		templateHelpers: function() {
			return {
				object_name: this.object_name
			}
		},

		initialize: function() {
			var view = this;

			view.object_name = "";

			view.instance = new Instance({instance_id: view.model.get("instance_id")});
			view.instance.fetch({
				success: function() {
					// specific object type here
					//
					view.dialog = new Dialog({dialog_id: view.instance.get("object_id")});
					view.dialog.fetch({
						success: function() {
							view.object_name = view.dialog.get("name");
							view.render();
						}
					});
				}
			});
		}

		// get instance and object here, remove name from display
	});
});
