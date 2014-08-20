define([
	'backbone',
	'text!templates/script_editor.tpl',
	'views/script_editor_option',
	'vent'
], function(Backbone, Template, ScriptEditorOptionView, vent) {
	var ScriptEditorView = Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		itemView: ScriptEditorOptionView,
		itemViewContainer: '.script_options',

		itemViewOptions: function(model, index) {
			return {
				scripts: this.scripts,
				script_options: this.script_options,
				dialog: this.dialog,
				script_editor_view: ScriptEditorView,
				contents: this.contents
			}
		},

		initialize: function(options) {
			this.root_dialog = options.root_dialog;
			this.scripts = options.scripts;
			this.dialog  = options.dialog;
			this.script_options = options.script_options;
			this.contents = options.contents;

			// FIXME keep track of this in a parent view or controller/app
			this.model.set("rendered", true);
		}

	});

	return ScriptEditorView;
});
