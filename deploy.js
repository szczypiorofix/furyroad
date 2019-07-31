var FtpDeploy = require('ftp-deploy');
var ftpDeploy = new FtpDeploy();
 
// Server app deploy config
var serverAppConfig = {
    user: process.env.FTPUSER,
    password: process.env.FTPPASS,
    host: process.env.FTPHOST,
    port: 21,
    localRoot: __dirname,
    remoteRoot: "/public_nodejs",
    deleteRemote: false,
    include: ['app.js']
}
    
ftpDeploy.deploy(serverAppConfig, function(err, res) {
    if (err) console.log(err)
    else console.log('Upload server app: done: '+res);
});


// React app deploy config
var reactAppConfig = {
    user: process.env.FTPUSER,
    password: process.env.FTPPASS,
    host: process.env.FTPHOST,
    port: 21,
    localRoot: __dirname + "/build/",
    remoteRoot: "/public_nodejs/public",
    deleteRemote: true,
    include: ['*']
}
    
ftpDeploy.deploy(reactAppConfig, function(err, res) {
    if (err) console.log(err)
    else console.log('Upload React app: done: '+res);
});
