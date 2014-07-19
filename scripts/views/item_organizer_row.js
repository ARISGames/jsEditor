define([
	'backbone',
	'text!templates/item_organizer_row.tpl',
	'vent'
], function(Backbone, Template, vent) {

	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		events: {
			"click .edit": "onClickEdit"
		},

		initialize: function() {
		},

		tagName: 'tr',

		onClickEdit: function() {
		}
	});
});
