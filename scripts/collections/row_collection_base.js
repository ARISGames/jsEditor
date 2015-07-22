define([
  'jquery',
  'underscore',
  'backbone',
  'collections/amf_collection_base',
  'vent'
],
function(
  $,
  _,
  Backbone,
  AmfCollectionBase,
  vent
)
{
  return AmfCollectionBase.extend({
    parse: function(json, response)
    {
      var header = json.data.columns;
      var rows   = json.data.rows;

      var objects = _.map(rows,
        function(row)
        {
          var object = {};
          _.each(row,
            function(attribute, index)
            {
              object[header[index]] = attribute;
            }
          );
          return object;
        }
      );
      return objects;
    },
  });
});
