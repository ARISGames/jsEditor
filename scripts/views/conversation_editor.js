define([
	'underscore',
	'panzoom',
	'backbone',
	'text!templates/conversation_editor.tpl',
	'views/script_editor',
	'models/dialog_script',
	'models/dialog_option',
	'models/character',
	'models/media',
	'collections/dialog_options',
	'vent'
], function(_, $panzoom, Backbone, Template, ScriptEditorView, DialogScript, DialogOption, Character, Media, DialogOptionsCollection, vent) {
	return Backbone.Marionette.ItemView.extend({
		template: _.template(Template),

		templateHelpers: function() {
			return {
				no_intro_script: !this.model
			}
		},

		className: 'conversation-editor',

		ui: {
			intro_script_region: '.intro_script_region'
		},

		events: {
			'click .add-intro-script': "onClickNew"
		},

		initialize: function(options) {
			this.incoming_options = options;
			this.game   = options.game;
			this.dialog = options.dialog;

			vent.on("conversation:update", this.render);
		},


		onRender: function() {
			var view = this;

			// Reset view
			this.incoming_options.scripts.each(function(script)
			{
				// Prevent recursive rendering
				script.set("rendered", false);
			});

			if(this.model) {
				this.model.set("root_node", true)
				var script_editor = new ScriptEditorView(_.extend(this.incoming_options, {el: this.ui.intro_script_region, model: this.model, collection: this.model.get("dialog_options")}));
				script_editor.render();

				if(!this.centered_once) {
					setTimeout(function() { view.centered_once = true; view.$el.get(0).scrollLeft = (view.$el.get(0).scrollWidth - view.$el.get(0).clientWidth) / 2 }, 200);
				}
                        }

			/*setTimeout(function() {
				view.$el.find('.conversation_pan_region').panzoom({
					contain: 'invert'
				});

			}, 300);*/
		},

		onClickNew: function() {
			var view = this;

			// Add them to collection for saving
			//
			this.model = new DialogScript({text: "Hello", game_id: this.game.id,
				dialog_id: this.dialog.id});

			var dialog_option = new DialogOption({prompt: "Bye bye", game_id: this.game.id, dialog_id: this.dialog.id});
			this.model.set("dialog_options", new DialogOptionsCollection([dialog_option]));

			var character = new Character({name: "You"})
			var media = new Media({media_id: "0"});

			character.set("media", media);
			this.model.set("character", character);

			// FIXME make them temporary until 'saved'
			$.when(this.model.save()).done(function () {
					view.dialog.set("intro_dialog_script_id", view.model.id);
					dialog_option.set("parent_dialog_script_id", view.model.id);

					$.when(view.dialog.save(), dialog_option.save()).done(view.render);
			});
		}
	});
});
