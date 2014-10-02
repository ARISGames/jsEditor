define([
	'underscore',
	'backbone',
	'text!templates/editors.tpl',
	'views/editor_row',
	'vent'
], function(_, Backbone, Template, EditorRowView, vent) {
	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		itemView: EditorRowView,
		itemViewContainer: '.editors',

		className: 'editor-sharing',

		events: {
			"click .add": "onClickAdd"
		},

		onClickAdd: function() {
			//users.getUserForSearch
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
