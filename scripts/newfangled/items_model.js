/*
  Items Model
  Takes instantiated aris_model object, and hijacks config attributes.
  Include/Require returns an instantiated object.
*/

define([
  'underscore',
  'newfangled/aris_model',
],
function(
  _,
  aris_model
)
{
  var self = _.clone(aris_model);

  self.getMethod        = "items.getItem";
  self.createMethod     = "items.createItem";
  self.updateMethod     = "items.updateItem";
  self.deleteMethod     = "items.deleteItem";
  self.getForGameMethod = "items.getItemsForGame";

  self.defaultObject =
  {
    "item_id":0,
    "game_id":0,
    "name":"Item",
    "description":"",
    "icon_media_id":0,
    "media_id":0,
    "droppable":0,
    "destroyable":0,
    "max_qty_in_inventory":0,
    "weight":0,
    "url":"",
    "type":"NORMAL",
    "delta_notification":0,
  };

  self.idAttribute = "item_id";

  return self;
});

