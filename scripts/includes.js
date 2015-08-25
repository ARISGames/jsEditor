/* Load paths for frameworks */
require.config(
{
  baseUrl:'scripts',

  paths:
  {
    /* Using AMD forks for non AMD compliant libraries */
    'text':  'library/require.text',
    'jed':   'library/jed',
    'qrcode':'library/qrcode',

    'jquery':  'library/jquery',
    'cookie':  'library/jquery.cookie',
    'jquidrag':'library/jquery.ui.draggable',
    'panzoom': 'library/jquery.panzoom',

    /* Backbone */
    'underscore':       'library/underscore',
    'backbone':         'library/backbone',
    'underscore.string':'library/underscore.string',

    /* Marionette */
    'backbone.babysitter':'library/backbone.babysitter',
    'backbone.wreqr':     'library/backbone.wreqr',
    'marionette':         'library/backbone.marionette',

    /* Bootstrap */
    'bootstrap':'library/bootstrap',

    /* App Config */
    'config':'config',

    /* Templates */
    'templates':'../templates',

    /* Images */
    'images':'../images'
  },

  shim:
  {
    'underscore.string':
    {
      deps:['underscore'],
    },

    "jqueryui":
    {
      exports:"$",
      deps:['jquery']
    },

    "jquerypan":
    {
      exports:"$",
      deps:['jquery']
    },

    'bootstrap':
    {
      deps:['jquery']
    },

    'qrcode':
    {
      exports:"QRCode"
    }
  },

  /* Visual Debugging */
  config:
  {
    text:
    {
    },

    moduleLog: (typeof document !== 'undefined') ? document.URL.match(/module-log/) : false
  }
});

