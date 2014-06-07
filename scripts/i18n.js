define([
	'jed'
], function(Jed) {

  var i18n = new Jed({
    // Generally output by a .po file conversion
    locale_data : {
      "messages" : {
        "" : {
          "domain" : "messages",
          "lang"   : "en",
          "plural_forms" : "nplurals=2; plural=(n != 1);"
        },
        "some key" : [ null, "some value"]
      }
    },
    "domain" : "messages"
  });

  console.log("i18n loaded", i18n.gettext( "some key" ) ); // alerts "some value"

  return i18n;
});
