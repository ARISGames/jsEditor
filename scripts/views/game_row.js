define(function(require)
{
	var _        = require('underscore');
	var _S       = require('underscore.string');
	var Backbone = require('backbone');
	var Template = require('text!templates/game_row.tpl');

	return Backbone.Marionette.ItemView.extend({
		template: _.template(Template),

		// Bootstrap
		tagName: 'a',
		className: "list-group-item clearfix",

		initialize: function(options)
		{
			this.model.icon().on('change', this.render);
		},

		templateHelpers: function()
		{
			return {
				icon_thumb_url: this.model.icon_thumbnail()
			}
		},

		events: {
			"click": "onClickShow"
		},

		onClickShow: function() {
			// TODO Move this to an event ie gamelist.game.clicked
			Backbone.history.navigate("#games/"+this.model.get('game_id')+"/scenes", {trigger: true});
		}
	});
});
