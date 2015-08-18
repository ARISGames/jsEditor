/*
  Requirement And Packages Model
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

  self.getMethod        = "requirements.getRequirementAndPackage";
  self.createMethod     = "requirements.createRequirementAndPackage";
  self.updateMethod     = "requirements.updateRequirementAndPackage";
  self.deleteMethod     = "requirements.deleteRequirementAndPackage";
  self.getForGameMethod = "requirements.getRequirementAndPackagesForGame";

  self.defaultObject =
  {
    "requirement_and_package_id":0,
    "game_id":0,
    "requirement_root_package_id":0,
    "name":"Requirement And Package",
  };

  self.idAttribute = "requirement_and_package_id";

  return self;
});

