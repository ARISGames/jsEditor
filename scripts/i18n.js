define([
	'jed',
	'underscore',
	'jquery',
	'cookie',
	'text!../locale/en.json',
	'text!../locale/es.json',
	'text!../locale/fr.json',
	'text!../locale/zh-Hant.json',
	'text!../locale/zh-Hans.json'
], function(Jed, _, $, Cookie, en, es, fr, zh_Hant, zh_Hans) {

	var user_language = ($.cookie('language') || navigator.userLanguage || navigator.language).toLowerCase();

	// TODO load from po directly
	// Map local strings to resources and display names
	var available_languages = [
		{locale_strings: en,      code: "en",    name: "English"},
		{locale_strings: fr,      code: "fr",    name: "Français"},
		{locale_strings: es,      code: "es",    name: "Español"},
		{locale_strings: zh_Hant, code: "zh-tw", name: "中文(台灣)"},
		{locale_strings: zh_Hans, code: "zh-cn", name: "中文(简体)"}
	];


	// Find nearest language to that requested by browser

	var get_closest_language = function(language_code) {
		var exact_match = _.find(available_languages, function(language) {
			return language.code === language_code;
		});

		var loose_match = _.find(available_languages, function(language) {
			return language.code.match(language_code.split("-")[0]);
		});

		return exact_match || loose_match || available_languages[0];
	};

	var detected_language = get_closest_language(user_language).locale_strings;
	var locale_strings = JSON.parse(detected_language);

	var jed = new Jed(locale_strings);

	var i18n = {
		gettext: function(text) { return jed.gettext(text); },
		available_languages: available_languages,
		get_closest_language: get_closest_language
	};

	return i18n;
});
