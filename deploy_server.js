var FtpDeploy = require('ftp-deploy');
var ftpDeploy = new FtpDeploy();
 
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


ftpDeploy.on('uploaded', function(data) {
    console.log(data);
});


ftpDeploy.deploy(serverAppConfig, function(err, res) {
    if (err) console.log(err)
    else console.log('Upload server app: done: '+res);
});
