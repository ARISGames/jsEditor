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

- Navigation triggers route
- Route triggers controller (TODO)
- Controller loads views into different parts of layout
- Views remove when needed
- Events to decouple code


TODO
----
- Field validation/cleaner user errors, like password
- Subclass views so they all inject i18n and avoid redundant requires
- Event decoupling for click events (to avoid calling navigate everywhere)
  (And how to do best.. events on views, on models, through vent?)
  Probably with controllers that can listen to events, and the router or the rest of the app triggers them.
- Remove extra requires (is marionette needed if backbone is already there?)
- Navigation prevention (warning) on changed forms
- codeception tests and unit tests
- Form builder for rendering out all fields with i18n and bootstrap classes and validation
- _.result to clean up where hash or function returning a hash is passed to base

DOING
-----
- Instances/Triggers creation with v2 api
- Rename/delete old views/models
- Media/Locations under v2 api
- Add controllers/events to remove dependencies inside the views
- Requirements editor for different objects
- Left side bar unhide

JS THINGS
---------
- return false in an event is the same as event.preventDefault();
- backbone wraps all its views in DIVS. some views set tagName to style Bootstrap or avoid invalid HTML.
- return null in a map function excludes that item :(
