define([
	'underscore',
	'backbone',
	'text!../../templates/quests.tpl',
	'collections/quests',
	'views/quest_item',
], function(_, Backbone, Template, QuestCollection, QuestItemView) {
	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		itemView: QuestItemView,

	    // Bootstrap wrapper
		tagName: "table",
		className: "table",

		events: {
			"click .new": "onClickNew"
		},


		onClickNew: function() {
			Backbone.history.navigate("#games/"+this.collection.parent.get('game_id')+"/quests/new", {trigger: true});
		}
	});
});
