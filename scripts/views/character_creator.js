define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'jqueryui',
	'bootstrap',
	'text!../../templates/character_creator.tpl',
	'vent'
], function($, _, Backbone, Marionette, jQueryUi, Bootstrap, Template, vent) {
	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		templateHelpers: function() {
			return {
				name: this.options.character.get('name'),
				description: this.options.character_instance.get('description')
			}
		},

		ui: {
			"name": "#character-name",
			"description": "#instance-description"
		},

		events: {
			"click .save": "onClickSave"
		},

		/* Save character for game and instance for scene */
		onClickSave: function() {
			var view = this;
			var character = this.options.character;
			var instance  = this.options.character_instance;

			// save character
			character.set("name", view.ui.name.val());

			character.save({},
			{
				success: function()
				{
					instance.set("description",    view.ui.description.val());
					instance.set("scene_id",       view.options.scene.id);
					instance.set("character_id",   character.id);
					instance.set("character_name", character.get("name"));
					instance.set("character",      character);

					instance.save({},
					{
						success: function()
						{
							vent.trigger("scene:add_instance", instance);
						}
					});
				}
			});					
			
		}
	});
});
