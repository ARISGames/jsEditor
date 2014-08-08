define([
	'backbone',
	'text!templates/script_editor.tpl',
	'views/script_editor_line',
	'vent'
], function(Backbone, Template, ScriptEditorLineView, vent) {
	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		itemView: ScriptEditorLineView,
		itemViewContainer: '.script_lines',

		itemViewOptions: function(model, index) {
			return {
				collection: model.get("dialog_options")
			}
		}
	});
});
