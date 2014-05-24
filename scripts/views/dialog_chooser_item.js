define([
	'backbone',
	'text!../../templates/dialog_chooser_item.tpl',
	'views/dialog_creator',
	'vent'
], function(Backbone, Template, DialogCreatorView, vent) {

	return Backbone.Marionette.ItemView.extend({
		template: _.template(Template),

		// Bootstrap
		tagName: 'tr',


		events: {
			"click .new-instance": "onClickNewInstance",
		},


		// TODO how to bubble up? or get scene passed to us
		onClickNewInstance: function() {
			//var dialog_instance = new DialogInstance({game_id: this.model.get("game_id")});

			//var dialog_creator  = new DialogCreatorView({scene: this.options.parent, dialog: this.model, dialog_instance: dialog_instance});
			//vent.trigger("application:info:show", dialog_creator);
		}
	});
});

