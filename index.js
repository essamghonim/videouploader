// Example express application adding the parse-server module to expose Parse
// compatible API routes.

var express = require('express');
var ParseServer = require('parse-server').ParseServer;

var databaseUri = process.env.DATABASE_URI || process.env.MONGOLAB_URI

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

var pushConfig = {};

if (process.env.GCM_SENDER_ID && process.env.GCM_API_KEY) {
    pushConfig['android'] = { senderId: process.env.GCM_SENDER_ID || '',
                              apiKey: process.env.GCM_API_KEY || ''};
}

if (process.env.APNS_ENABLE) {
    pushConfig['ios'] = [
        {
            pfx: __dirname + 'HerokuCert.p12', // P12 file only
            //cert: __dirname + 'HerokuCert.pem', // If not using the .p12 format, the path to the certificate PEM to load from disk
            //key: __dirname + 'HerokuKey.pem', // If not using the .p12 format
            bundleId: 'Com.ConnectLtd.PalBuddy',  // change to match bundleId
            production: false // dev certificate
        }
    ]
}


var filesAdapter = null;  // enable Gridstore to be the default
if (process.env.S3_ENABLE) {
    var S3Adapter = require('parse-server').S3Adapter;

    filesAdapter = new S3Adapter(
        process.env.AWS_ACCESS_KEY,
        process.env.AWS_SECRET_ACCESS_KEY,
        {bucket: process.env.AWS_BUCKET_NAME, bucketPrefix: "", directAccess: true}
    );
}

var api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://heroku_6zwn7b5f:ob6ajleb92b08h3v3c22ds6pbk@ds023603.mlab.com:23603/heroku_6zwn7b5f',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'essamghonimaucbrunel03121993',
  masterKey: process.env.MASTER_KEY || 'myMasterKeyqazwsxedcrfvtgbyhnujm!@#$%^&*', //Add your master key here. Keep it secret!
  push: pushConfig,
  filesAdapter: filesAdapter,
  verbose: true,
  serverURL: process.env.SERVER_URL || 'https://palscoob.herokuapp.com/parse'  // needed for Parse Cloud and push notifications
});
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

var app = express();

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

// Parse Server plays nicely with the rest of your web routes
app.get('/', function(req, res) {
  res.status(200).send('I dream of being a web site.');
});

var port = process.env.PORT || 1337;
app.listen(port, function() {
    console.log('parse-server-example running on port ' + port + '.');
});
