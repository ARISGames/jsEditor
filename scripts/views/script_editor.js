define([
	'backbone',
	'text!templates/script_editor.tpl',
	'models/dialog_option',
	'models/dialog_script',
	'views/script_editor_option',
	'views/dialog_script_editor',
	'vent'
], function(Backbone, Template, DialogOption, DialogScript, ScriptEditorOptionView, DialogScriptEditorView, vent) {
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
			this.instance_parent_option = options.instance_parent_option;
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
			var script_editor = new DialogScriptEditorView({model: this.model, scripts:this.scripts, script_options:this.script_options, instance_parent_option:this.instance_parent_option});
			vent.trigger("application:info:show", script_editor);
			return false;
		},
		onClickAdd: function() {
			var view = this;

			var script = new DialogScript();
			script.set("game_id",view.model.get("game_id"));
			script.set("dialog_id",view.model.get("dialog_id"));
			script.set("text","Hello");
			script.save({}, {
				success: function() {
					view.scripts.push(script);

					var option = new DialogOption();
					option.set("game_id",view.model.get("game_id"));
					option.set("dialog_id",view.model.get("dialog_id"));
					option.set("parent_dialog_script_id",view.model.get("dialog_script_id"));
					option.set("link_type","DIALOG_SCRIPT");
					option.set("link_id",script.get("dialog_script_id"));
					option.set("prompt","Continue");
					option.save({}, {
						success:function() {
							view.script_options.push(option);

							option = new DialogOption();
							option.set("game_id",view.model.get("game_id"));
							option.set("dialog_id",view.model.get("dialog_id"));
							option.set("parent_dialog_script_id",script.get("dialog_script_id"));
							option.set("link_type","EXIT");
							option.set("prompt","Exit");
							option.save({}, {
								success:function() {
									view.script_options.push(option);

									vent.trigger("conversation:update");
								}
							});
						}
					});
				}
			});

			return false;
		}

	});

	return ScriptEditorView;
});
