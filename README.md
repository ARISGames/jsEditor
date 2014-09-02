ARIS Web Editor
===============

A browser based javascript editor for the ARIS games platform. Built on top of the `Backbone.Marionette` MVC framework.
See http://arisgames.org

Requirements
------------

| Library    | Version |
|------------|---------|
| require.js | 2.1.10  |
| jquery     | 1.10.2  |
| marionette | 1.4.1   |
| backbone   | 1.1.0   |
| underscore | 1.5.2   |

Getting Started
---------------

The flow control of the application goes:

* `index.html` Load require.js and load main.
* `scripts/main.js` Defines short cuts to frameworks, sets up dependencies, triggers application.
* `scripts/application.js` Sets up regions and event handlers for them, checks for authentication and fires up the router.
* `scripts/models/session.js` Manages session cookie and authentication.
* `scripts/router.js` Maps starting point urls (the application does not map 1 to 1 for urls and views) to functions, loads models and renders their views.


Notes
-----

All Aris database objects are backed by Backbone models located in the `scripts/models/` directory.

> A custom Backbone.sync method replaces the normal REST style of communication with one friendly to the Aris Amfphp backend.

Translations
------------

Text sourced by running `xgettext.pl` (BSD version on OSX) to get .po files of templates. Edited with `poedit` or similar. Then `po2json` from https://github.com/mikeedwards/po2json converts them to json with `jed` mode enabled.
