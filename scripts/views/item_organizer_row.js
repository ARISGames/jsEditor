define(function(require)
{
	var Backbone       = require('backbone');
	var Template       = require('text!templates/item_organizer_row.tpl');
	var ItemEditorView = require('views/item_editor');
	var vent           = require('vent');


	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		events: {
			"click .edit": "onClickEdit"
		},

		initialize: function() {
			this.listenTo(this.model, "update", this.render);
		},

		tagName: 'tr',

		onClickEdit: function() {
			var view  = this;

			var item_editor = new ItemEditorView({model: view.model});
			vent.trigger("application:popup:show", item_editor, "Edit Item");
		}
	});
});
