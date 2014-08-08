define([
	'backbone',
	'text!templates/script_editor_line.tpl',
	'views/script_line_option',
	'vent'
], function(Backbone, Template, ScriptLineOptionView, vent) {
	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		itemView: ScriptLineOptionView,
		itemViewContainer: '.script_line_options'
	});
});
