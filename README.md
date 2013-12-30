###Node.js CAS Login Module####

The CAS library provided in index.js was designed parimly around gatech's impmlementation of CAS.

CAS expects two parameters, url and service.  url should point to the CAS's restful api's login, and service should point to which website requested the login.  

Georgia Tech's CAS RESTful API's login URL is https://login.gatech.edu/cas.

Here is an example configuration:
```
var Cas = require('../cas/index.js');
var cas = new Cas({
  url : 'https://login.gatech.edu/cas',
  service : 'http://critique.gatech.edu'
});
```

CAS as of now only has one method, which is validate.  validate takes in two parameters, the specified CAS Ticket, and a callback.  
Here is an example of the validate method:
```
var ticket = 'ST-31352479-Lq2lf234520bFkgzjhwm-cas1.oit.gatech.edu';
cas.validate(ticket, function(err, username) {
  if(err) {
    res.jsonp(err);
  } else {
    res.jsonp({status: "logged in", username: username});
  }
});
```

If you're using gatech's cas service, the ticket can be found using the following steps:
1) go to the url using the format: https://login.gatech.edu/cas?service=:servicename, eg: ```https://login.gatech.edu/cas?service=http://gatech.edu```
2) Enter your gatech login credentials, and you'll be redirected to the service page.  Appenened to the end of the url will be ?ticket=:ticket  eg: ```http://gatech.edu?ticket=ST-31352479-Lq2lf234520bFkgzjhwm-cas1.oit.gatech.edu```

From my own testing with gatech's implementation, it seems that each ticket can only be parsed to a username once.  If you don't want to constantly re-loged the user using CAS, you'll need to use a library such-as [node-client-sessions](https://github.com/mozilla/node-client-sessions).

