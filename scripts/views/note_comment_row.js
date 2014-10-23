define(function(require)
{
	var _        = require('underscore');
	var Backbone = require('backbone');
	var Template = require('text!templates/note_comment_row.tpl');
	var vent     = require('vent');


	return Backbone.Marionette.ItemView.extend({
		template: _.template(Template),

		// Bootstrap
		tagName: 'a',
		className: "list-group-item",

		templateHelpers: function() {
			return {
				user_name: "joe"
			}
		}
	});
});



