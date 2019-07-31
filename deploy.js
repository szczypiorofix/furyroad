var FtpDeploy = require('ftp-deploy');
var ftpDeploy = new FtpDeploy();
 
var config = {
    user: process.env.FTPUSER,
    password: process.env.FTPPASS,
    host: process.env.FTPHOST,
    port: 21,
    localRoot: __dirname,
    remoteRoot: "/public_nodejs",
    deleteRemote: false,
    include: ['app.js', 'build/*'],
}
    
ftpDeploy.deploy(config, function(err, res) {
    if (err) console.log(err)
    else console.log('Upload done: '+res);
});
