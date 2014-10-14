define([
	'underscore',
	'backbone',
	'text!templates/tabs.tpl',
	'views/tab_row',
	'views/tab_editor',
	'models/tab',
	'models/media',
	'collections/items',
	'collections/plaques',
	'collections/web_pages',
	'collections/dialogs',
	'vent'
], function(_, Backbone, Template, TabRowView, TabEditorView, Tab, Media, ItemsCollection, PlaquesCollection, WebPagesCollection, DialogsCollection, vent) {
	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		itemView: TabRowView,
		itemViewContainer: '.tabs',

		className: 'tabs-editor',

		events: {
			"click .new": "onClickNew"
		},

		onClickNew: function() {
			var view = this;

			var tab = new Tab({game_id: this.model.get("game_id")});

			var icon = new Media({media_id: tab.get("icon_media_id")});

			$.when(icon.fetch()).done(function()
			{
				var tab_editor = new TabEditorView({model: tab, icon: icon});

				tab_editor.on("tab:add", function(tab) {
					view.collection.add(tab);
				});

				vent.trigger("application:popup:show", tab_editor, "Create Tab");
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
