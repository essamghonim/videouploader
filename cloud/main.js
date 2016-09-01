
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi Complete change Essam');
});
Parse.Cloud.define("sendPushToUser", function(request, response) {
  var senderUser = request.user;
  var recipientUserId = request.params.recipientId;
  var message = request.params.message;
  if (senderUser.get("friendIds").indexOf(recipientUserId) === -1) {
    response.error("The recipient is not the sender's friend, cannot send push.");
  }
  if (message.length > 140) 
  {
    message = message.substring(0, 137) + "...";
  }
  var recipientUser = new Parse.User();
  recipientUser.id = recipientUserId;
  var pushQuery = new Parse.Query(Parse.Installation);
  pushQuery.equalTo("user", recipientUser);
  Parse.Push.send({
    where: pushQuery,
    data: {
      alert: message
    }
  }).then(function() {
      response.success("Push was sent successfully.")
  }, function(error) {
      response.error("Push failed to send with error: " + error.message);
  });
});
