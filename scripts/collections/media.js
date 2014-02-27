define([
	'jquery',
	'underscore',
	'backbone',
	'models/media',
	'collections/amf_collection_base',
	'vent'
], function($, _, Backbone, Media, AmfCollectionBase, vent) {
	return AmfCollectionBase.extend({

		model: Media,

		url: function() {
			return this.amfphp_url_root+'media.getMedia/'+this.parent.get('game_id');
		},
	});
});
