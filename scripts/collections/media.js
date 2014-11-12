define(function(require, exports, module)
{
	var Media = require('models/media');
	var JsonCollectionBase = require('collections/json_collection_base');
	var vent = require('vent');


	return JsonCollectionBase.extend({

		model: Media,

		amfphp_url: "media.getMediaForGame"
	});
});
