define([
  'backbone',
  'text!templates/event_package_organizer.tpl',
  'views/event_package_organizer_row',
  'views/event_package_editor',
  'models/event_package',
  'vent',
  'storage'
],
function(
  Backbone,
  Template,
  EventPackageOrganizerRowView,
  EventPackageEditorView,
  EventPackage,
  vent,
  storage
)
{
  return Backbone.Marionette.CompositeView.extend(
  {
    template: _.template(Template),

    itemView: EventPackageOrganizerRowView,
    itemViewContainer: ".event_packages",

    events:
    {
      "click .new": "onClickNew"
    },

    onClickEdit: function()
    {
      var items  = new ItemsCollection([], {parent: this.model});

      $.when(items.fetch()).done(
        function()
        {
          var eventPackage = new EventPackage({game_id:this.model.id});
          var event_package_editor = new EventPackageEditorView({model:eventPackage, items:items});
          vent.trigger("application:popup:show", event_package_editor, "Create Event", true);
        }
      );
    }
  });
});

