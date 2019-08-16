var FtpDeploy = require('ftp-deploy');
var ftpDeploy = new FtpDeploy();
     
// React app deploy config
var reactAppConfig = {
    user: process.env.FTPUSER,
    password: process.env.FTPPASS,
    host: process.env.FTPHOST,
    port: 21,
    localRoot: __dirname + "/build/",
    remoteRoot: "/public_nodejs/public",
    deleteRemote: true,
    include: ['*'],
    exclude: ['./public/app.ts']
}


ftpDeploy.on('uploaded', function(data) {
    console.log(data);
});


ftpDeploy.deploy(reactAppConfig, function(err, res) {
    if (err) console.log(err)
    else console.log('Upload React app: done: '+res);
});
