
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi Complete change Essam');
});
Parse.Cloud.define('testParagraph', function(req, res) {
  console.log("received......... this is a console log for a test function that will print out a paragraph as a test");
  res.success('Hi, this is the start of a new test function that will print out a paragraph');
});
Parse.Cloud.define("iosPushTest", function(request, response) {

  // request has 2 parameters: params passed by the client and the authorized user                                                                                                                               
  var params = request.params;
  var user = request.user;

  // Our "Message" class has a "text" key with the body of the message itself                                                                                                                                    
  var messageText = params.text;
  var pushQuery = new Parse.Query(Parse.Installation);
  pushQuery.equalTo('deviceType', 'ios'); // targeting iOS devices only                                                                                                                                          

  Parse.Push.send({
    where: pushQuery, // Set our Installation query                                                                                                                                                              
    data: {
      alert: "Message: " + messageText
    }
  }, { success: function() {
      console.log("#### PUSH OK");
  response.success('success');
  }, error: function(error) {
      console.log("#### PUSH ERROR" + error.message);
  response.success('Didnot succeed');
  }, useMasterKey: true});

});
Parse.Cloud.define("PushTest", function(request, response) {
var query = new Parse.Query(Parse.Installation);
Parse.Push.send({ 
  where: query,
  data: {
    alert: "When do we take to outer space"
  }
}, {
  success: function() {
    console.log("Push was successful");
  },
  error: function(error) {
    console.error(error);
  }
});

});
