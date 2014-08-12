define([
	'backbone',
	'text!templates/script_editor_option.tpl',
	'vent'
], function(Backbone, Template, vent) {
	return Backbone.Marionette.ItemView.extend({
		template: _.template(Template),

		className: "script_option",

		initialize: function(options) {
			console.log("option view", this.model.attributes);
			this.scripts = options.scripts;
			this.dialog = options.dialog;
			this.script_options = options.script_options;
			this.script_editor_view = options.script_editor_view;
		},

		onRender: function() {
			if(this.model.get("link_type") === "DIALOG_SCRIPT") {

				var dialog_script = this.scripts.findWhere({dialog_script_id: this.model.get("link_id")});
				console.log("option dialog", this.model.get("link_id"));

				if(dialog_script.get("rendered") === false) {
					var child_view = this.$el.find(".child_script_"+this.model.get("dialog_option_id"));

					var conversations_editor = new this.script_editor_view({model: dialog_script, collection: dialog_script.get("dialog_options"), dialog: this.dialog, scripts: this.scripts, script_options: this.script_options, el: child_view});
					conversations_editor.render();
				}
			}
			else {
				console.log("option", this.model.get("link_type"));
			}
		}
	});
});
