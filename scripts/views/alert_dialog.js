define([
	'underscore',
	'backbone',
	'text!templates/alert_dialog.tpl',
	'vent'
], function(_, Backbone, Template, vent) {
	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		templateHelpers: function() {
			return {
				text: this.text
			}
		},

		triggers: {
			"click .ok": "ok"
		},

		initialize: function(options) {
			this.text = options.text;
		}

	});
});
