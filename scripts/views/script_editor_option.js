define([
	'underscore',
	'underscore.string',
	'backbone',
	'text!templates/script_editor_option.tpl',
	'vent'
], function(_, _s, Backbone, Template, vent) {
	return Backbone.Marionette.ItemView.extend({
		template: _.template(Template),

		className: "script_option",

		templateHelpers: function() {
			return {
				option_selected: function(boolean_statement) {
					return boolean_statement ? "selected" : "";
				},
				link_types: this.link_types,

				scripts: this.scripts
				// all game items
			}
		},

		// field change events

		initialize: function(options) {
			this.scripts = options.scripts;
			this.dialog  = options.dialog;
			this.script_options = options.script_options;
			this.script_editor_view = options.script_editor_view;
		},

		link_types: {
			'DIALOG_SCRIPT':    "Script",
			'EXIT':             "Exit Conversation",
			'EXIT_TO_PLAQUE':   "Exit to Plaque",
			'EXIT_TO_ITEM':     "Exit to Item",
			'EXIT_TO_WEB_PAGE': "Exit to Web Page",
			'EXIT_TO_DIALOG':   "Exit to Dialog",
			'EXIT_TO_TAB':      "Exit to Tab"
		},

		onRender: function() {
			if(this.model.get("link_type") === "DIALOG_SCRIPT") {

				var dialog_script = this.scripts.findWhere({dialog_script_id: this.model.get("link_id")});

				if(dialog_script.get("rendered") === false) {
					var child_view = this.$el.find(".child_script_"+this.model.get("dialog_option_id"));

					var conversations_editor = new this.script_editor_view({model: dialog_script, collection: dialog_script.get("dialog_options"), dialog: this.dialog, scripts: this.scripts, script_options: this.script_options, el: child_view});
					conversations_editor.render();
				}
			}
		}
	});
});
