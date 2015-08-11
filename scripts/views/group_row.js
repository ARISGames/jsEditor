define([
  'underscore',
  'backbone',
  'text!templates/group_row.tpl',
  'vent',
  'views/group_editor',
  'models/media',
  'models/game',
  'models/group',
],
function(
  _,
  Backbone,
  Template,
  vent,
  GroupEditorView,
  Media,
  Game,
  Group,
)
{
  return Backbone.Marionette.ItemView.extend(
  {
    template: _.template(Template),

    tagName: 'a',
    className: "list-group-item draggable-game-group",

    events:
    {
      "click": "onClickEdit"
    },

    modelEvents:
    {
      "change": "render"
    },

    templateHelpers: function()
    {
      return {
        display_type: this.should_display_type(),
        group_type: this.model.group_type_name(),
        group_name: this.group_name()
      }
    },

    group_name: function()
    {
      return this.model.get("name") || this.group_object_name() || "(unnamed group)"
    },

    initialize: function()
    {
      this.bindAssociation();
      this.loadAssociation();

      this.listenTo(vent, 'grouprow:released', this.onRowReleased.bind(this));
    },

    onClickEdit: function()
    {
      var self = this;

      var game = this.model.game();

      var group_editor = new GroupEditorView({model:self.model, contents:contents});
      vent.trigger("application:popup:show", group_editor, "Edit Group");
    },

    loadAssociation: function()
    {
      this.unbindAssociation();

      var content_class =
      {
        "DIALOG":   Dialog,
        "ITEM":     Item,
        "PLAQUE":   Plaque,
        "WEB_PAGE": WebPage
      }

      var object_class = content_class[this.model.get("type")];
      var object_id    = this.model.get("content_id");

      if(object_class && object_id)
      {
        this.model.game_object(new object_class({game_id: this.model.game().id}));
        this.model.game_object().set(this.model.game_object().idAttribute, object_id);
        this.bindAssociation();
        this.model.game_object().fetch();
      }
    },

    unbindAssociation: function()
    {
      this.stopListening(this.model.game_object());
    },

    bindAssociation: function()
    {
      if(this.model.game_object())
      {
        this.listenTo(this.model.game_object(), 'change', this.render);// function() { console.log("got it", arguments) ;});
      }
      this.listenTo(this.model, 'change:content_id', this.loadAssociation);
    },

    onRowReleased: function(element, position)
    {
      if(this.$el.is(element))
      {
        this.model.save({"sort_index": position}, {patch: true});
      }
    }
  });
});

