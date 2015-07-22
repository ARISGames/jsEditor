define(
function(require)
{
  var JsonCollection = require('collections/json_collection_base');
  var NoteComment    = require('models/note_comment');

  return JsonCollection.extend({
    model: NoteComment,
    amfphp_url: "note_comments.getNoteCommentsForNote"
  });
});

