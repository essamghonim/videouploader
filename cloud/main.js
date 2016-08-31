
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
Parse.Cloud.define('Hey', function(req, res) {
    var query = new Parse.Query(Parse.Installation);
    query.equalTo('deviceToken', 'cd55c9c159d76100c4c12257cd639aa344ad9b025080f67b16aef57b4811c2af');

    Parse.Push.send({
      where: query, // Set our Installation query
      data: {
        alert: "Willie Hayes injured by own pop fly."
      }
    },{
      success: function() {
        // Push was successful
          res.success('HiHiHiHiHiHiHiHiHiHiHiHiHiHiHiHiHi');
      },
      error: function(error) {
        // Handle error
          res.error(error);
      }
    },{ useMasterKey: true });
      
});
