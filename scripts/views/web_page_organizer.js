define([
  'backbone',
  'text!templates/web_page_organizer.tpl',
  'views/web_page_organizer_row',
  'views/web_page_editor',
  'models/web_page',
  'storage',
  'vent',
],
function(
  Backbone,
  Template,
  WebPageOrganizerRowView,
  WebPageEditorView,
  WebPage,
  storage,
  vent
)
{
  return Backbone.Marionette.CompositeView.extend(
  {
    template: _.template(Template),

    itemView: WebPageOrganizerRowView,
    itemViewContainer: ".web_pages",

    initialize: function(options)
    {
      var self = this;
    },

    events:
    {
      "click .new": "onClickNew"
    },

    onClickNew: function()
    {
      var self = this;
      var web_page  = new WebPage({game_id:storage.game.get("game_id")});

      var web_page_editor = new WebPageEditorView({model:web_page});
      vent.trigger("application:popup:show", web_page_editor, "Create Web Page");
    },

  });
});

