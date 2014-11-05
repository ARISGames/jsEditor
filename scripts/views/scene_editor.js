define([
	'underscore',
	'backbone',
	'text!templates/scene_editor.tpl',
	'vent'
], function(_, Backbone, Template, vent) {
	return Backbone.Marionette.ItemView.extend({
		template: _.template(Template),

		// TODO move into a base view
		templateHelpers: function() {
			return {
				is_new: this.model.isNew(),
				in_modal: this.options.in_modal,
				is_intro_scene: this.is_intro_scene(),

				is_checked: function(value)
				{
					return value === "1" ? "checked" : "";
				}
			};
		},

		ui: {
			name:        '#scene-name',
			intro_scene: '#scene-intro'
		},

		onShow: function() {
			this.$el.find('input[autofocus]').focus();
		},

		events: {
			"click .save-scene":   "onClickSave",
			"click .cancel":       "onClickCancel",
			"click .delete-scene": "onClickDelete",
		},

		// FIXME why do we need this vs other views?
		modelEvents: {
			"change": "render"
		},

		is_intro_scene: function() {
			// FIXME can just compare models if we load all scenes into storage.
			return this.model.id === this.model.game().get("intro_scene_id");
		},

		onClickSave: function() {
			var view = this;
			this.model.set('name', this.ui.name.val());
			this.model.save({}, {
					create: function() {
						vent.trigger("scenes:add", view.model);
					},
					success: function() {
						vent.trigger("game_object:update", view.model);
						vent.trigger("application:popup:hide");
					}
			});


			if(this.ui.intro_scene.is(":checked"))
			{
				this.model.game().save({"intro_scene_id": this.model.id}, {patch: true});
			}
		},


		onClickCancel: function() {
			this.close();
			vent.trigger("application:popup:hide");
		},

		onClickDelete: function() {
			var view = this;

			this.model.destroy({
				success: function() {
					view.close();
					vent.trigger("scenes:remove", view.model);
				}
			});
		}
	});
});
