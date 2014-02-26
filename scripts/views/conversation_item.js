define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'text!../../templates/conversation_item.tpl',
	'views/edit_amf_model',
	'vent'
], function($, _, Backbone, Marionette, Template, EditAmfModelView, vent) {
	return Backbone.Marionette.ItemView.extend({
		template: _.template(Template),

		// Bootstrap
		tagName: 'tr',


		events: {
			'click .edit': 'onClickEdit'
		},


		onClickEdit: function() {
			vent.trigger("application.show", new EditAmfModelView({model: this.model}));

			Backbone.history.navigate("#games/"+this.model.get('game_id')+
			                     "/characters/"+this.model.get('npc_id')+
			                  "/conversations/"+this.model.get('conversation_id')+
								        "/edit", {trigger: false});
		}
	});
});
