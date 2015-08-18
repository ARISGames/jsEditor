/*
  Events Model
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

  self.getMethod        = "requirements.getRequirementAtom";
  self.createMethod     = "requirements.createRequirementAtom";
  self.updateMethod     = "requirements.updateRequirementAtom";
  self.deleteMethod     = "requirements.deleteRequirementAtom";
  self.getForGameMethod = "requirements.getRequirementAtomsForGame";

  self.defaultObject =
  {
    "requirement_atom_id":0,
    "game_id":0,
    "requirement_and_package_id":0,
    "bool_operator":0,
    "requirement":"ALWAYS_TRUE",
    "content_id":0,
    "distance":0,
    "qty":0,
    "latitude":0,
    "longitude":0,
  };

  self.idAttribute = "requirement_atom_id";

  return self;
});

