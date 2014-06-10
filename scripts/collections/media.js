define([
	'jquery',
	'underscore',
	'backbone',
	'models/media',
	'collections/json_collection_base',
	'vent'
], function($, _, Backbone, Media, JsonCollectionBase, vent) {
	return JsonCollectionBase.extend({

		model: Media,

		amfphp_url: "media.getMediaForGame"
	});
});
