/* application launcher */

require(
  ['application', 'backbone', 'marionette'],
  function(application, Backbone, Marionette)
  {
    Backbone.xrayViewDebugging = (typeof document !== 'undefined') ? document.URL.match(/xray-goggles/) : false;
    application.start();
  }
);

