
Parse.Cloud.define('hello', function(req, res) {
  res.success(req.params.firstVar + " " + req.params.secondVar);
});
Parse.Cloud.define("checkPrice", function(request, response) {
  var currentPriceQuery = new Parse.Query("UserUpdated");
    currentPriceQuery.equalTo("username", "Omar Nabil");
    currentPriceQuery.find({
        success: function(results) {
            var obj = results[0];
                obj.set("username", "Pal No Buddy");
                obj.save(null,{
                  success: function (object) { 
                    response.success(object);
                  }, 
                error: function (object, error) { 
                  console.log(error.message);
                }
              });
        },
        error: function(error) {
            console.log("failed");
        }
    });

});
Parse.Cloud.define('pushChannelTest', function(request, response) {

  // request has 2 parameters: params passed by the client and the authorized user
  var params = request.params;
  var user = request.user;

  // To be used with:
  // https://github.com/codepath/ParsePushNotificationExample
  // See https://github.com/codepath/ParsePushNotificationExample/blob/master/app/src/main/java/com/test/MyCustomReceiver.java
  var customData = params.customData;
  var launch = params.launch;
  var broadcast = params.broadcast;

  // use to custom tweak whatever payload you wish to send
  var pushQuery = new Parse.Query(Parse.Installation);
  pushQuery.equalTo("deviceType", "android");

  var payload = {};

  if (customData) {
      payload.customdata = customData;
  }
  else if (launch) {
      payload.launch = launch;
  }
  else if (broadcast) {
      payload.broadcast = broadcast;
  }

  // Note that useMasterKey is necessary for Push notifications to succeed.

  Parse.Push.send({
  where: pushQuery,      // for sending to a specific channel
  data: payload,
  }, { success: function() {
     console.log("#### PUSH OK");
  }, error: function(error) {
     console.log("#### PUSH ERROR" + error.message);
  }, useMasterKey: true});

  response.success('success');
});

// iOS push testing
Parse.Cloud.define("iosPushTest", function(request, response) {

  // request has 2 parameters: params passed by the client and the authorized user                                                                                                                               
  var params = request.params;
  //var user = request.user;
var user = new Parse.User();
user.id = 'RO9GEfkgI6';    
  // Our "Message" class has a "text" key with the body of the message itself                                                                                                                                    
  var messageText = params.text;

  var pushQuery = new Parse.Query(Parse.Installation);
  pushQuery.equalTo('user', user);                                                                                                                                        

  Parse.Push.send({
    where: pushQuery, // Set our Installation query                                                                                                                                                              
    data: {
      alert: "Best Of Luck",
    badge: 1,
    sound: 'default'
    }
  }, { success: function() {
      console.log("#### PUSH OK");
  }, error: function(error) {
      console.log("#### PUSH ERROR" + error.message);
  }, useMasterKey: true});

  //response.success('success');
});
