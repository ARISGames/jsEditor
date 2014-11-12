define(function(require)
{
	var _             = require('underscore');
	var Backbone      = require('backbone');
	var Template      = require('text!templates/tags.tpl');
	var TagRowView    = require('views/tag_row');
	var TagEditorView = require('views/tag_editor');
	var Tag           = require('models/tag');
	var vent          = require('vent');


	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		itemView: TagRowView,
		itemViewContainer: '.tags',

		className: 'tags-editor',

		events: {
			"click .new": "onClickNew"
		},

		onClickNew: function() {
			var view = this;

			var tag = new Tag({game_id: this.model.get("game_id")});

			var tag_editor = new TagEditorView({model: tag});

			tag_editor.on("tag:add", function(tag) {
				view.collection.add(tag);
			});

			vent.trigger("application:popup:show", tag_editor, "Create Tag");
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
