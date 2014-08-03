define([
	'underscore',
	'backbone',
	'text!templates/quests.tpl',
	'views/quest_row',
	'views/quest_editor',
	'models/quest',
	'models/media',
	'vent'
], function(_, Backbone, Template, QuestRowView, QuestEditorView, Quest, Media, vent) {
	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		itemView: QuestRowView,
		itemViewContainer: '.quests',

		events: {
			"click .new": "onClickNew"
		},

		onClickNew: function() {
			var view = this;

			var quest = new Quest({game_id: this.model.get("game_id")});

			var icons = {
				active_icon:    new Media({media_id: quest.get("active_icon_media_id"  )}),
				active_media:   new Media({media_id: quest.get("active_media_id"       )}),
				complete_icon:  new Media({media_id: quest.get("complete_icon_media_id")}),
				complete_media: new Media({media_id: quest.get("complete_media_id"     )})
			};

			$.when(icons.active_icon.fetch(), icons.active_media.fetch(), icons.complete_icon.fetch(), icons.complete_media.fetch()).done(function()
			{
				var quest_editor = new QuestEditorView(_.extend({model: quest}, icons));

				quest_editor.on("quest:add", function(quest) {
					view.collection.add(quest);
				});

				vent.trigger("application:popup:show", quest_editor, "Create Quest");
			});
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
