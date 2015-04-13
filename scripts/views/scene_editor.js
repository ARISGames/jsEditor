define(function(require)
{
	var _                        = require('underscore');
	var Backbone                 = require('backbone');
	var Template                 = require('text!templates/scene_editor.tpl');
	var vent                     = require('vent');
	var storage                  = require('storage');


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

		is_intro_scene: function() {
			// FIXME can just compare models if we load all scenes into storage.
			return this.model.id === this.model.game().get("intro_scene_id");
		},

		onClickSave: function() {
			var view = this;

			var set_intro = view.ui.intro_scene.is(":checked");
			this.model.set('name', this.ui.name.val());

			this.model.save({}, {
					create: function() {
						storage.add_game_object(view.model);
					},
					success: function() {

						if(set_intro)
						{
							view.model.game().save({"intro_scene_id": view.model.id}, {patch: true});
						}
						else
						{
							view.model.game().fetch();
						}

						view.render();

						vent.trigger("application:popup:hide");
					}
			});

		},


		onClickCancel: function() {
			this.close();
			vent.trigger("application:popup:hide");
		},

		onClickDelete: function() {
			var view = this;

			this.model.destroy({
				success: function() {
					view.model.game().fetch();
					view.close();
				}
			});
		}
	});
});
