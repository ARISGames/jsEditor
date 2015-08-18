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

  self.getMethod        = "requirements.getRequirementRootPackage";
  self.createMethod     = "requirements.createRequirementRootPackage";
  self.updateMethod     = "requirements.updateRequirementRootPackage";
  self.deleteMethod     = "requirements.deleteRequirementRootPackage";
  self.getForGameMethod = "requirements.getRequirementRootPackagesForGame";

  self.defaultObject =
  {
    "requirement_root_package_id":0,
    "game_id":0,
    "name":"Requirement Root Package",
  };

  self.idAttribute = "requirement_root_package_id";

  return self;
});

