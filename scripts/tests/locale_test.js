require(['i18n'], function(i18n) {
  test( "primary match en", function() {
    equal( i18n.get_closest_language("en").code, "en" );
  });

  test( "primary match zh-tw", function() {
    equal( i18n.get_closest_language("zh-tw").code, "zh-tw" );
  });

  test( "loose match en-US to parent en", function() {
    equal( i18n.get_closest_language("en-US").code, "en" );
  });

  test( "loose match zh-hk to closest zh", function() {
    equal( i18n.get_closest_language("zh-hk").code, "zh-tw" );
  });

  test( "no match default to en", function() {
    equal( i18n.get_closest_language("xx-YY").code, "en" );
  });
});
