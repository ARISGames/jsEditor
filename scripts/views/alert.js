define([
	'backbone',
	'text!../../templates/alert.tpl',
	'vent'
], function(Backbone, Template, Trigger, Instance, DialogTriggerEditorView, vent) {

	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		templateHelpers: function() {
			return {
				text: this.options.text
			}
		}
	});
});

