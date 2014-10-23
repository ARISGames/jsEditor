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
				is_new: this.model.isNew(),

				url:  this.media.content()
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
