/*
  Simple wrapper for XHR.
  Most/all requests to the ARIS server are just about the same, so use this as a layer around all the setup.
  Passes off just about everything into the application layer, meaning the HTTP pipline is pretty much identical for every req.

  (^ "Well you're using HTTP wrong then!?" If there were a way to get around using HTTP,
  and just deal with sending utf8 JSON over TCP in browser, I'd do it. javascript tho... so good... amirite?)
*/

define([
  'config',
  'aris_session',
],
function(
  config,
  aris_session
)
{
  return new (function() //'new' means no need to reinstantiate every time (well, it auto-reinstantiates it on require...)
  {
    self.request = function(method, data, callbacks)
    {
      if(aris_session.loggedIn()) data.auth = aris_session.authPackage();

      var xhr = new XmlHttpRequest();
      xhr.onreadystatechange = function()
      {
        switch(xhr.readyState)
        {
          case 0://UNSENT
            break;
          case 1://OPENED
            break;
          case 2://HEADERS_RECEIVED
            break;
          case 3://LOADING
            break;
          case 4://DONE
            if(xhr.status == 200) //good
            {
              console.log("Type :"+xhr.responseType);
              console.log("Text :"+xhr.responseText);
              if(callbacks.success) callbacks.success(xhr.responseText);
            }
            else
            {
              console.log("Bad thing- "+xhr.statusText);
              if(callbacks.fail) callbacks.fail(xhr.responseText);
            }
            break;
        }
      }
      xhr.timeout = 0;
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.open("POST",config.aris_api_url+method,true);
      xhr.send(data);
    }
  });
});

