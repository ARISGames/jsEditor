define([
  'models/json_base'
],
function(
  JsonBaseModel
)
{
  return JsonBaseModel.extend(
  {
    idAttribute: 'requirement_atom_id',

    amfphp_url_attributes: [
      "requirement_atom_id",
      "bool_operator",
      "requirement",
      "content_id",
      "qty",
      "latitude",
      "longitude",
      "distance",
    ],

    defaults: {
      bool_operator:"1",
      requirement:"PLAYER_HAS_ITEM",
      content_id:"0",
      qty:"1",
      latitude:"86.75309",
      longitude:"3.141592",
      distance:"5.0",
    }

    // requirement types
    /*
      "PLAYER_HAS_ITEM"
      "PLAYER_HAS_TAGGED_ITEM"
      "PLAYER_VIEWED_ITEM"
      "PLAYER_VIEWED_PLAQUE"
      "PLAYER_VIEWED_DIALOG"
      "PLAYER_VIEWED_WEB_PAGE"
      "PLAYER_HAS_UPLOADED_MEDIA_ITEM"
      "PLAYER_HAS_UPLOADED_MEDIA_ITEM_IMAGE"
      "PLAYER_HAS_UPLOADED_MEDIA_ITEM_AUDIO"
      "PLAYER_HAS_UPLOADED_MEDIA_ITEM_VIDEO"
      "PLAYER_HAS_COMPLETED_QUEST"
      "PLAYER_HAS_RECEIVED_ICOMING_WEB_HOOK"
      "PLAYER_HAS_NOTE"
      "PLAYER_HAS_NOTE_WITH_TAG"
      "PLAYER_HAS_NOTE_WITH_LIKES"
      "PLAYER_HAS_NOTE_WITH_COMMENTS"
      "PLAYER_HAS_GIVEN_NOTE_COMMENTS"

      switch(this.model.get("requirement")) {
        case "PLAYER_HAS_ITEM":
        case "PLAYER_HAS_TAGGED_ITEM":
        case "PLAYER_VIEWED_ITEM":
        case "PLAYER_VIEWED_PLAQUE":
        case "PLAYER_VIEWED_DIALOG":
        case "PLAYER_VIEWED_WEB_PAGE":
        case "PLAYER_HAS_UPLOADED_MEDIA_ITEM":
        case "PLAYER_HAS_UPLOADED_MEDIA_ITEM_IMAGE":
        case "PLAYER_HAS_UPLOADED_MEDIA_ITEM_AUDIO":
        case "PLAYER_HAS_UPLOADED_MEDIA_ITEM_VIDEO":
        case "PLAYER_HAS_COMPLETED_QUEST":
        case "PLAYER_HAS_RECEIVED_ICOMING_WEB_HOOK":
        case "PLAYER_HAS_NOTE":
        case "PLAYER_HAS_NOTE_WITH_TAG":
        case "PLAYER_HAS_NOTE_WITH_LIKES":
        case "PLAYER_HAS_NOTE_WITH_COMMENTS":
        case "PLAYER_HAS_GIVEN_NOTE_COMMENTS":
          return true;


        default:
          return false;
      }
    */

  });
});

