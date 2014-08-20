define([
	'underscore',
	'backbone',
	'text!templates/conversation_editor.tpl',
	'views/script_editor',
	'vent'
], function(_, Backbone, Template, ScriptEditorView, vent) {
	return Backbone.Marionette.ItemView.extend({
		template: _.template(Template),

		templateHelpers: function() {
			return {
				no_intro_script: !this.model
			}
		},

		className: 'conversation-editor',

		ui: {
			intro_script_region: '.intro_script_region'
		},

		events: {
			"change @ui.link_type": "onChangeLinkType",
		},


		initialize: function(options) {
			this.incoming_options = options;
		},


		onRender: function() {
			var view = this;
			if(this.model) {
				var script_editor = new ScriptEditorView(_.extend({el: this.ui.intro_script_region}, this.incoming_options));
				script_editor.render();

				setTimeout(function() { view.$el.get(0).scrollLeft = (view.$el.get(0).scrollWidth - view.$el.get(0).clientWidth) / 2 }, 200);
			}
		}
	});
});
