define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'text!../../templates/quests.tpl',
	'collections/quests',
	'views/quest_item',
], function($, _, Backbone, Marionette, Template, QuestCollection, QuestItemView) {
	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		itemView: QuestItemView,

	    // Bootstrap wrapper
		tagName: "table",
		className: "table"
	});
});
