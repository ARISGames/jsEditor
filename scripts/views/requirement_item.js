define([
	'underscore',
	'backbone',
	'text!../../templates/requirement_item.tpl',
], function(_, Backbone, Template) {
	return Backbone.Marionette.ItemView.extend({
		template: _.template(Template),

		// Bootstrap
		tagName: 'tr',


		events: {
			"click .edit": "onClickEdit"
		},


		onClickEdit: function() {
			Backbone.history.navigate("#games/"+this.model.get('game_id')+"/requirements/"+this.model.get('requirement_id')+"/edit", {trigger: true});
		}
	});
});
