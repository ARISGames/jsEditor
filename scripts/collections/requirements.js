define([
  'jquery',
  'underscore',
  'backbone',
  'models/requirement',
  'collections/row_collection_base',
  'vent',
  'models/session'
],
function(
  $,
  _,
  Backbone,
  Requirement,
  RowCollectionBase,
  vent,
  session
)
{
  return RowCollectionBase.extend(
  {
    model: Requirement,
    url: function() {
      // hard coded for location temporarily
      return this.amfphp_url_root+"requirements.getRequirementsForObject/"+this.parent.get('game_id')+"/Location/"+this.parent.get('location_id')+"/"+session.editor_id()+"/"+session.auth_token();
    },
  });
});

