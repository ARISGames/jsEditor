Approach
========

Install RequireJS, along with AMD friendly backbone, marionette, underscore, jquery, less.
(Avoid bower/jam/grunt/r.js for now)


Future security thoughts:
XSS  (others invoking code on your views)
CSRF (secret between your session and the server passed in all forms)


FLOW
----

- Application start
- Store destination url
- Check logged in cookie
- Present login OR Navigate


TODO
----
- Marionette layout of items
- Event decoupling for click events (to avoid calling navigate everywhere)
  (And how to do best.. events on views, on models, through vent?)
- Session singleton?
- Remove extra requires (is marionette needed if backbone is already there?)
- Refactor to single amfPHP model and collection.
- Subclass views so they all inject i18n
- Navigation prevention (warning) on changed forms
- codeception tests and unit tests


DOING
-----
- Sync with AMFphp stuff
- Add game create, plaque create/edit/delete


JS THINGS
---------
- return false in an event is the same as event.preventDefault();
- backbone wraps all its views in DIVS. some views set tagName to style Bootstrap or avoid invalid HTML.
