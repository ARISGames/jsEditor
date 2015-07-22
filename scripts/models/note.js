define(
function(require)
{
  var JsonBaseModel = require('models/json_base');
  var storage       = require('storage');

  var NoteComments  = require('collections/note_comments');
  var Game          = require('models/game');

  return JsonBaseModel.extend({
    idAttribute: 'note_id',

    amfphp_url_templates: {
      read:   "notes.getNote",
      update: "",
      create: "",
      delete: "notes.deleteNote"
    },

    amfphp_url_attributes: [
      "note_id",
         "game_id"
    ],

    defaults: {
      media_id: "0"
    },


    /* Associations */

    user: function() {
      return storage.users.retrieve(this.get('user'));
    },

    media: function() {
      return storage.media.retrieve(this.get('media_id'));
    },

    tag: function() {
      return storage.tags.retrieve(this.get('tag_id'));
    },

    comments: function() {
      if(this.comments_collection)
      {
        return this.comments_collection;
      }
      else
      {
        var game = new Game({game_id: this.get('game_id')});
        this.comments_collection = new NoteComments([], {parent: this, game: game});
        this.comments_collection.fetch();
        return this.comments_collection;
      }
    }

  });
});

