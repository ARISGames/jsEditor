define([
	'underscore',
	'backbone',
	'text!templates/tags.tpl',
	'views/tag_row',
	'views/tag_editor',
	'models/tag',
	'models/media',
	'vent'
], function(_, Backbone, Template, TagRowView, TagEditorView, Tag, Media, vent) {
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

			var media = new Media({media_id: tag.get("media_id")});

			$.when(media.fetch()).done(function()
			{
				var tag_editor = new TagEditorView({model: tag, media: media});

				tag_editor.on("tag:add", function(tag) {
					view.collection.add(tag);
				});

				vent.trigger("application:popup:show", tag_editor, "Create Tag");
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
