define(function(require)
{
	var _        = require('underscore');
	var $        = require('jquery');
	var Backbone = require('backbone');
	var Template = require('text!templates/note_editor.tpl');
	var vent     = require('vent');

	var NoteCommentRowView = require('views/note_comment_row');


	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		templateHelpers: function() {
			return {
				is_new:       this.model.isNew(),
		   		has_media:    this.media.id !== "0",
		   		has_comments: this.collection.length > 0,

				url:       this.media.content(),
				tag_name:  this.model.tag  ().get("tag"),
				user_name: this.model.user ().get("display_name")
			};
		},

		itemView: NoteCommentRowView,
		itemViewContainer: '.note_comments',

		onShow: function() {
			this.$el.find('input[autofocus]').focus();
		},

		events: {
			"click .delete": "onClickDelete"
		},

		// NOTE trying to hide header based on collection size bug work around.
		collectionEvents: {
			"add": function() { this.$el.find(".comments-header").show() },
			"remove": function(model, collection) { if(collection.length === 0) { this.$el.find(".comments-header").hide() } }
		},

		initialize: function(options) {
			this.media      = this.model.media();
		},

		onClickDelete: function() {
			this.model.destroy({
				success: function() {
					vent.trigger("application:popup:hide");
				}
			});
		},

		onRender: function() {
			this.switchMediaPreviewer();
		},

		switchMediaPreviewer: function() {
			this.$el.find('.media-previewer').hide();

			if     (this.media.is_video()) { this.$el.find('.video-preview').show(); }
			else if(this.media.is_audio()) { this.$el.find('.audio-preview').show(); }
			else                           { this.$el.find('.image-preview').show(); }
		}
	});
});
