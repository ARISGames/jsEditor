define([
  'collections/json_collection_base',
  'models/web_page',
  'vent'
],
function(
  JsonCollection,
  WebPage
)
{
  return JsonCollection.extend(
  {
    model: WebPage,
    amfphp_url: "web_pages.getWebPagesForGame"
  });
});

