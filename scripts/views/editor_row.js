define([
	'underscore',
	'backbone',
	'text!templates/editor_row.tpl',
	'views/alert_dialog',
	'vent',
	'models/session'
], function(_, Backbone, Template, AlertDialog, vent, session) {
	return Backbone.Marionette.ItemView.extend({
		template: _.template(Template),

		templateHelpers: function() {
			return {
				current_user: session.editor_id() === this.model.get("user_id"),
				only_user: this.editors.length === 1
			}
		},

		// Bootstrap
		className: "list-group-item author-row",

		events: {
			"click .remove": "onClickRemove"
		},

		initialize: function(options) {
			var view = this;

			this.editors = options.editors;

			this.editors.on("remove", function(model) {
				view.render();
			});

		},

		onClickRemove: function() {
			var view = this;

			// check if self to warn
			if(session.editor_id() === this.model.get("user_id"))
			{
				var alert_dialog = new AlertDialog({text: "You won't be able to add yourself back as an Editor once removed.", danger_button: true, danger_text: "Remove", cancel_button: true});

				alert_dialog.on("danger", function() {
					vent.trigger("application:popup:hide");
					view.model.destroy({
						success: function() {
							Backbone.history.navigate("#games", {trigger: true});
						}
					});
				});

				alert_dialog.on("cancel", function() {
					vent.trigger("application:popup:hide");
				});

				vent.trigger("application:popup:show", alert_dialog, "Warning");

			}
			else {
				this.model.destroy();
			}
		}

	});
});
