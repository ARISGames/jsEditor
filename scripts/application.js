/* Application */
define([
  'jquery',
  'backbone',
  'marionette',
  'models/session',
  'vent',
  'router',
  'views/user_nav_menu',
  'storage',
  'storage_collections'
],
function(
  $,
  Backbone,
  Marionette,
  session,
  vent,
  Router,
  UserNavMenuView,
  storage,
  StorageCollections
)
{
  var application = new Backbone.Marionette.Application();

  // Application Layout
  //
  application.addRegions(
  {
    main_region:   "#main",
    nav_region:    "#navigation",
    user_region:   "#user",
    list_region:   "#list",
    info_region:   "#info",
    dialog_region: "#modal-body"
  });

  // Application Constructor
  //
  application.addInitializer(
    function()
    {
      // Add all game object collections to application storage.
      StorageCollections.inject(storage);

      this.session = session;
      this.router  = new Router;
    }
  );

  // Authorization Redirect
  //
  application.on(
    "initialize:after",
    function()
    {
      if(!this.session.logged_in())
      {
        if(window.location.hash === "#login")
        {
          this.intended_destination = "#";
          Backbone.history.start();
        }
        else
        {
          this.intended_destination = window.location.hash;
          Backbone.history.start({silent: true});
          Backbone.history.navigate("#login", {trigger: true});
        }
      }
      else
      {
        Backbone.history.start();
        vent.trigger("application:user:show");
      }
    }
  );

  // Render Event receiver
  //
  vent.on("application.show",              function(view)     { application.main_region.show(view); });
  vent.on("application:nav:show",          function(view)     { application.nav_region.show(view);  });
  vent.on("application:nav:hide",          function()         { application.nav_region.reset();     });
  vent.on("application:list:show",         function(view)     { application.list_region.show(view); });
  vent.on("application:list:hide",         function()         { application.list_region.reset();    });
  vent.on("application:info:current_view", function(callback) { callback.call(application, application.info_region.currentView); }); // return current view to event
  vent.on("application:info:show",         function(view)     { application.info_region.show(view); });
  vent.on("application:info:hide",         function()         { application.info_region.reset();    });

  vent.on(
    "application:popup:show",
    function(view, title, large)
    {
      // TODO add a title property to views which is smart based on where its rendered

      // Reset
      $('#modal-title').text("");
      $('.modal-header').hide();
      $('.modal-dialog').removeClass("modal-lg");

      if(large) { $('.modal-dialog').addClass("modal-lg"); }

      // Notify View
      view.options.in_modal = true;

      // Re-show old view hack
      view.delegateEvents();

      application.dialog_region.show(view);
      $('.modal').modal('show');
      // Clear event list
      $('.modal').off("hidden.bs.modal");

      $('.modal').on("hidden.bs.modal", function(event)
      {
        view.trigger("popup:hide");
        application.dialog_region.reset();
      });

      if(title)
      {
        $('#modal-title').text(title);
        $('.modal-header').show();
      }
    }
  );

  vent.on("application:popup:hide",        function()     { $('.modal').modal('hide'); });
  vent.on("application:popup:hide:ifself", function(view) { if(application.dialog_region.currentView === view) $('.modal').modal('hide'); });
  vent.on("application:user:show",         function()     { application.user_region.show(new UserNavMenuView()); });
  vent.on("application:working:show",      function(text) { $('.aris-alert').html(text); $('.aris-alert').show(); });
  vent.on("application:working:hide",      function()     { $('.aris-alert').delay(500).fadeOut(1000); });

  vent.on(
    "application:alert",
    function(options)
    {
      $('.alert-text').text(options.text)
      $('.alert').show();
      $('.alert button').on('click', function() { $('.alert').hide(); });
    }
  );

  vent.on(
    "application:alert:hide",
    function()
    {
      $('.alert-text').text('')
      $('.alert').hide();
    }
  );

  // Redirect back to intended destination after authorization
  //
  vent.on(
    "session.login",
    function()
    {
      // force visit root if empty
      var destination = application.intended_destination || "#";
      Backbone.history.navigate(destination, {trigger: true});
      vent.trigger("application:user:show");
    }
  );

  vent.on(
    "session.logout",
    function()
    {
      // TODO each region listen to reset?
      application.info_region.reset();
      application.list_region.reset();
      application.nav_region.reset();
      application.user_region.reset();
      Backbone.history.navigate("#login", {trigger: true});
    }
  );

  return application;
});

