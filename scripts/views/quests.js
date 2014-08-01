define([
	'underscore',
	'backbone',
	'text!templates/quests.tpl',
	'views/quest_row',
	'views/quest_editor',
	'models/quest',
	'vent'
], function(_, Backbone, Template, QuestRowView, QuestEditorView, Quest, vent) {
	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		itemView: QuestRowView,
		itemViewContainer: '.quests',

		events: {
			"click .new": "onClickNew"
		},

		onClickNew: function() {
			var quest = new Quest({game_id: this.model.get("game_id")});
			var quest_editor = new QuestEditorView({model: quest});

			quest_editor.on("quest:add", function(quest) {
				this.collection.add(quest);
			}.bind(this));

			vent.trigger("application:popup:show", quest_editor, "Create Quest");
		},


		// Marionette override
		appendBuffer: function(compositeView, buffer) {
			var $container = this.getItemViewContainer(compositeView);
			$container.find(".foot").before(buffer);
		},

		appendHtml: function(compositeView, itemView, index){
			if (compositeView.isBuffering) {
			  compositeView.elBuffer.appendChild(itemView.el);
			}
			else {
			  // If we've already rendered the main collection, just
			  // append the new items directly into the element.
			  var $container = this.getItemViewContainer(compositeView);
			  $container.find(".foot").before(itemView.el);
			}
		}
	});
});
