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

				scripts: this.scripts,

				// game objects for option menu
				plaques:   this.plaques,
				items:     this.items,
				web_pages: this.web_pages,
				dialogs:   this.dialogs,
				tabs:      this.tabs,

				link_options_visible: this.model.get("link_type") !== "EXIT",

				link_scripts:   this.model.get("link_type") === "DIALOG_SCRIPT",
				link_plaques:   this.model.get("link_type") === "EXIT_TO_PLAQUE",
				link_items:     this.model.get("link_type") === "EXIT_TO_ITEM",
				link_web_pages: this.model.get("link_type") === "EXIT_WEB_PAGE",
				link_dialogs:   this.model.get("link_type") === "EXIT_DIALOG",
				link_tabs:      this.model.get("link_type") === "EXIT_TAB",
			}
		},

		ui: {
			link_type: ".link-type",
			link_id:   ".link-id"
		},

		events: {
			"change @ui.link_type": "onChangeLinkType",
			"change @ui.link_id":   "onChangeLinkId"
		},


		initialize: function(options) {
			this.scripts = options.scripts;
			this.dialog  = options.dialog;
			this.script_options = options.script_options;
			this.script_editor_view = options.script_editor_view;

			this.contents = options.contents;

			this.plaques   = options.contents.plaques;
			this.items     = options.contents.items;
			this.web_pages = options.contents.web_pages;
			this.dialogs   = options.contents.dialogs;
			this.tabs      = options.contents.tabs;
		},


		link_types: {
			'DIALOG_SCRIPT':    "Script",
			'EXIT':             "Exit",
			'EXIT_TO_PLAQUE':   "Exit to Plaque",
			'EXIT_TO_ITEM':     "Exit to Item",
			'EXIT_TO_WEB_PAGE': "Exit to Web Page",
			'EXIT_TO_DIALOG':   "Exit to Conversation",
			'EXIT_TO_TAB':      "Exit to Tab"
		},


		onChangeLinkType: function() {
			var value = this.ui.link_type.find("option:selected").val();
			this.model.set("link_type", value);

			// 0 out link ID before re-rendering sub select
			this.model.set("link_id", "0");
			this.render();
		},


		/* Nested rendering */
		onRender: function() {
			if(this.model.get("link_type") === "DIALOG_SCRIPT") {

				var dialog_script = this.scripts.findWhere({dialog_script_id: this.model.get("link_id")});

				// TODO need a handle on events so all related options have a chance to re-render this object if it gets removed elsewhere
				if(dialog_script.get("rendered") === false) {
					var child_view = this.$el.find(".child_script_"+this.model.get("dialog_option_id"));

					var conversations_editor = new this.script_editor_view({model: dialog_script, collection: dialog_script.get("dialog_options"), dialog: this.dialog, scripts: this.scripts, script_options: this.script_options, contents: this.contents, el: child_view});
					conversations_editor.render();
				}
			}
		}
	});
});
