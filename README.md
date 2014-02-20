ARIS Web Editor
===============

A browser based javascript editor for the ARIS games platform. Built on top of the `Backbone.Marionette` MVC framework.

Requirements
------------

| Library    | Version |
|------------|---------|
| require.js | 2.1.10  |
| jquery     | 1.10.2  |
| marionette | 1.4.1   |
| backbone   | 1.1.0   |
| underscore | 1.5.2   |

Notes
-----

All Aris database objects are backed by Backbone models located in the `scripts/models/` directory.

> A custom Backbone.sync method replaces the normal REST style of communication with one friendly to the Aris Amfphp backend.
