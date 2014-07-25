define([
	'backbone',
	'text!templates/web_page_chooser.tpl',
	'models/web_page',
	'models/trigger',
	'models/instance',
	'models/media',
	'views/web_page_chooser_row',
	'views/web_page_trigger_editor',
	'vent'
], function(Backbone, Template, WebPage, Trigger, Instance, Media, WebPageChooserRowView, WebPageTriggerEditorView, vent) {

	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		itemView: WebPageChooserRowView,
		itemViewContainer: ".web_pages",

		itemViewOptions: function(model, index) {
			return {
			  parent: this.options.parent
			}
		},

		events: {
			"click .new-web_page": "onClickNewWebPage"
		},

		/* TODO move complex sets like this into a controller */
		onClickNewWebPage: function() {
			var web_page   = new WebPage   ({game_id: this.options.parent.get("game_id")});
			var trigger  = new Trigger  ({game_id: this.options.parent.get("game_id"),scene_id: this.options.parent.get("scene_id")});
			var instance = new Instance ({game_id: this.options.parent.get("game_id")});
			var icon     = new Media    ({media_id: web_page.get("icon_media_id")});

			var trigger_editor = new WebPageTriggerEditorView({scene: this.options.parent, icon: icon, web_page: web_page, instance: instance, model: trigger, visible_fields: "create_web_page_with_trigger"});
			vent.trigger("application:popup:show", trigger_editor, "Add WebPage to Scene");
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
