define([
	'backbone',
	'text!templates/script_editor.tpl',
	'views/script_editor_option',
	'views/dialog_script_editor',
	'vent'
], function(Backbone, Template, ScriptEditorOptionView, DialogScriptEditorView, vent) {
	var ScriptEditorView = Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),
		templateHelpers: function() {
			return {
				root_node: this.model.has('root_node')
			}
		},

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
			this.scripts = options.scripts;
			this.dialog  = options.dialog;
			this.script_options = options.script_options;
			this.contents = options.contents;

			// FIXME keep track of this in a parent view or controller/app
			this.model.set("rendered", true);
		},

		events: {
			"click .edit-script": "onClickEdit",
			"click .add-option": "onClickAdd",
		},

		onClickEdit: function() {
			var script_editor = new DialogScriptEditorView({model: this.model});
			vent.trigger("application:info:show", script_editor);
			return false;
		},
		onClickAdd: function() {
                  /*
			var script_editor = new DialogScriptEditorView({model: this.model});
			vent.trigger("application:info:show", script_editor);
			return false;
                  */
		}

	});

	return ScriptEditorView;
});
