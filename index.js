var request = require('request');

module.exports = function Cas(params) {
  //Initalization ERROR Handling
  if(typeof params.url === 'undefined') {
    throw new Error("No URL specified for CAS");
  }
  if(typeof params.service === 'undefined') {
    throw new Error("No service specified for CAS");
  }
  //remove any trailing slash on url
  if(params.url.substr(-1) === '/') {
    this.url = params.url.substr(0, params.url.length - 1);
  } else {
    this.url = params.url;
  }
  this.service = params.service;
  this.validate = function(ticket, callback) {
    if(ticket.length < 1) {
      return callback({error: "Improper ticket given"}, null);
    }
    var that = this;
    request(this.url + '/serviceValidate?ticket=' + ticket + '&service=' + this.service, function(error, response, body) {
      var userIndex = {
        start : body.indexOf('<cas:user>'),
        end : body.indexOf('</cas:user>')
      };
      if(!error && userIndex.start >=0 && userIndex.end >= 0) {
        var username = body.substring(userIndex.start + "<cas:user>".length, userIndex.end).trim("\n");
        callback(null, username);
      } else {
        callback({error : "Could not parse", body : body, response : response}, null);
      }
    });
  };



};
