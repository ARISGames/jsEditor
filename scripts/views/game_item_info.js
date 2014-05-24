define([
	'underscore',
	'backbone',
	'text!../../templates/game_item_info.tpl',
], function(_, Backbone, Template) {
	return Backbone.Marionette.ItemView.extend({
		template: _.template(Template),
	});
});
