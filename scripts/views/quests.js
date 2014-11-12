define(function(require)
{
	var _               = require('underscore');
	var Backbone        = require('backbone');
	var Template        = require('text!templates/quests.tpl');
	var QuestRowView    = require('views/quest_row');
	var QuestEditorView = require('views/quest_editor');
	var Quest           = require('models/quest');
	var vent            = require('vent');


	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		itemView: QuestRowView,
		itemViewContainer: '.quests',

		className: 'quests-editor',

		events: {
			"click .new": "onClickNew"
		},

		onClickNew: function() {
			var view = this;

			var quest = new Quest({game_id: this.model.get("game_id")});

			var quest_editor = new QuestEditorView({model: quest});

			quest_editor.on("quest:add", function(quest) {
				view.collection.add(quest);
			});

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
