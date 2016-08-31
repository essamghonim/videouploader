
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi Complete change Essam');
});
Parse.Cloud.define("iosPushTest", function(request, response) {
Parse.initialize("essamghonimaucbrunel03121993", "myMasterKeyqazwsxedcrfvtgbyhnujm!@#$%^&*");
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
