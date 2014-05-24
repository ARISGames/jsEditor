define([
	'underscore',
	'backbone',
	'text!../../templates/quest_item.tpl',
], function(_, Backbone, Template) {
	return Backbone.Marionette.ItemView.extend({
		template: _.template(Template),

		// Bootstrap
		tagName: 'tr',

		events: {
			"click .edit": "onClickEdit"
		},


		onClickEdit: function() {
			Backbone.history.navigate("#games/"+this.model.get('game_id')+"/quests/"+this.model.get('quest_id')+"/edit", {trigger: true});
		}
	});
});
