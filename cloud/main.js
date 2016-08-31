
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi Complete change Essam');
});
Parse.Cloud.define("iosPushTest", function(request, response) {
//Parse.initialize("essamghonimaucbrunel03121993", "myMasterKeyqazwsxedcrfvtgbyhnujm!@#$%^&*");
var pushQuery = new Parse.Query(Parse.Installation);
pushQuery.equalTo('deviceToken', 'cd55c9c159d76100c4c12257cd639aa344ad9b025080f67b16aef57b4811c2af');
Parse.Push.send({
data: {
alert: 'The Giants Mets 2-3.',
badge: 1,
sound: 'default'
}
}, {
success: function() {
console.log('##### PUSH OK');
},
error: function(error) {
console.log('##### PUSH ERROR');
},
useMasterKey: true
});
});
Parse.Cloud.define("Message", function(request, response) {
  // Our "Message" class has a "text" key with the body of the message itself
  var pushQuery = new Parse.Query(Parse.Installation);
  pushQuery.equalTo('deviceType', 'ios'); // targeting iOS devices only
  Parse.Push.send({
    where: pushQuery, // Set our Installation query
    data: {
      alert: "Message: "
    }
  }).then(function() {
    // Push was successful
  }, function(error) {
    throw "Got an error " + error.code + " : " + error.message;
  });
});
