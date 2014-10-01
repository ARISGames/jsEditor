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
				text: this.text,
				confirm_button: this.confirm_button,
				cancel_button:  this.cancel_button,
				danger_button:  this.danger_button,

				confirm_text: this.confirm_text,
				cancel_text:  this.cancel_text,
				danger_text:  this.danger_text
			}
		},

		triggers: {
			"click .confirm": "confirm",
			"click .danger":  "danger",
			"click .cancel":  "cancel"
		},

		initialize: function(options) {
			this.text = options.text;

			this.confirm_button = options.confirm_button;
			this.cancel_button  = options.cancel_button;
			this.danger_button  = options.danger_button;

			this.confirm_text = options.confirm_text;
			this.cancel_text  = options.cancel_text;
			this.danger_text  = options.danger_text;
		},

		onShow: function() {
			// gross
			setTimeout(function() { this.$el.find('button[autofocus]').focus()}.bind(this), 300);
		}

	});
});
