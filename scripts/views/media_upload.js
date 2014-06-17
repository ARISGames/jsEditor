define([
	'underscore',
	'backbone',
	'text!templates/media_upload.tpl',
	'vent'
], function(_, Backbone, Template, vent) {
	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		initialize: function() {
			this.reader = new FileReader();
			this.reader.onload = this.onReadFile.bind(this);
		},


		ui: {
			name: "#dialog-name",
			preview: ".upload-preview"
		},


		events: {
			"click .save": "onClickSave",
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

			// strip base64 header
			var start = data.indexOf(",") + 1;
			var data  = data.substr(start);

			this.model.set("data", data);

		},


		onClickSave: function() {
			var view = this;

			this.model.set("display_name", this.ui.name.val());

			this.model.save({}, {
				success: function() {
					vent.trigger("media:upload", view.model);
					vent.trigger("application:dialog:hide");
				}
			});

			event.preventDefault();
		}
	});
});

