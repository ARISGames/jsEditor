define([
	'underscore',
	'backbone',
	'text!templates/dialog_chooser_rows_empty.tpl'
], function(_, Backbone, Template) {
	return Backbone.Marionette.ItemView.extend({
		template: _.template(Template),

		tagName: 'tr'
	});
});
