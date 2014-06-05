define([
	'underscore',
	'backbone',
	'text!../../templates/game_rows_empty.tpl'
], function(_, Backbone, Template) {
	return Backbone.Marionette.ItemView.extend({
		template: _.template(Template),

		tagName: 'a',
		className: 'list-group-item list-group-item-info'
	});
});
