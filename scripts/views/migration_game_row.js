define(function(require)
{
	var _        = require('underscore');
	var _S       = require('underscore.string');
	var Backbone = require('backbone');
	var Template = require('text!templates/migration_game_row.tpl');

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
			"click": "onClickMigrate"
		},
	});
});
