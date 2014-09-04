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
			return { }
		},

		className: 'conversation-editor',

		ui: {
			intro_script_region: '.intro_script_region'
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

			this.model.set("root_node", true)
			var script_editor = new ScriptEditorView(_.extend(this.incoming_options, {el: this.ui.intro_script_region, model: this.model, collection: this.model.get("dialog_options"), conversation_editor_view: this}));
			script_editor.render();

			if(!this.centered_once) {
				setTimeout(function() { view.centered_once = true; view.$el.get(0).scrollLeft = (view.$el.get(0).scrollWidth - view.$el.get(0).clientWidth) / 2 }, 200);
			}

			/*setTimeout(function() {
				view.$el.find('.conversation_pan_region').panzoom({
					contain: 'invert'
				});

			}, 300);*/
		},
	});
});
