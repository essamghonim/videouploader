
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi Complete change Essam');
});
Parse.Cloud.afterSave("EA2iWMF1H3D123PntxOaGI0jS", function(request) {
  var messageText = request.object.get('text');
  var pushQuery = new Parse.Query(Parse.Installation);
      pushQuery.equalTo('deviceType', 'ios');
        Parse.Push.send({
            where: pushQuery, // Set our Installation query
            data: {
              alert: "New message: Hello Essam"
             }
            }, {
      success: function() {
      // Push was successful
          },
      error: function(error) {
        throw "Got an error " + error.code + " : " + error.message;
          }
            });
});
