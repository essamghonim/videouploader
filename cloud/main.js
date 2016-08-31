
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi Complete change Essam');
});
Parse.Cloud.afterSave("SendPush", function(request) {
var query = new Parse.Query(Parse.Installation);
  query.exists("deviceToken");
  var payload = {
    alert: "YOUR_MESSAGE"
      // you can add other stuff here...
  };
  Parse.Push.send({
      data: payload,
      where: query
    }, {
      useMasterKey: true
    })
    .then(function() {
      response.success("Push Sent!");
    }, function(error) {
      response.error("Error while trying to send push " + error.message);
    });
});
