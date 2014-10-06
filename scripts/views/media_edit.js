define([
	'underscore',
	'backbone',
	'text!templates/media_edit.tpl',
	'vent'
], function(_, Backbone, Template, vent) {
	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		initialize: function() {
			this.reader = new FileReader();
			this.reader.onload = this.onReadFile.bind(this);
		},


		ui: {
			name: "#media-name",
			preview: ".upload-preview"
		},


		events: {
			"click .save": "onClickSave",
			"click .delete": "onClickDelete",
			"change #uploader": "onChangeFile"
		},


		/* File selected from browser file picker */
		onChangeFile: function(event) {
			var input_file = event.target.files[0];

			this.model.set("file_name", input_file.name.toLowerCase());
			this.reader.readAsDataURL(input_file);
		},


		/* FileReader onload callback */
		onReadFile: function(event) {
			var data = event.target.result;

			// Preview
			this.ui.preview.attr("src", data);
			this.switchMediaPreviewer();

			// strip base64 header
			var start = data.indexOf(",") + 1;
			var data  = data.substr(start);

			this.model.set("data", data);

		},


		onClickSave: function() {
			var view = this;

			this.model.set("name", this.ui.name.val());

			this.model.save({}, {
				success: function() {
					vent.trigger("media:update", view.model);
					vent.trigger("application:popup:hide");
				}
			});

			event.preventDefault();
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

			if     (this.model.is_video()) { this.$el.find('.video-preview').show(); }
			else if(this.model.is_audio()) { this.$el.find('.audio-preview').show(); }
			else                           { this.$el.find('.image-preview').show(); }
		}
	});
});

