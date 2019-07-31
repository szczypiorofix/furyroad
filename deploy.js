var FtpDeploy = require('ftp-deploy');
var ftpDeploy = new FtpDeploy();
 
var config = {
    user: process.env.FTPUSER,
    password: process.env.FTPPASS,
    host: process.env.FTPHOST,
    port: 21,
    localRoot: __dirname,
    remoteRoot: "/public_nodejs",
    deleteRemote: true,
    include: ['app.js', 'build/*'],
    exclude: ['package.json', 'package-lock.json', 'node_modules/**']
}
    
ftpDeploy.deploy(config, function(err, res) {
    if (err) console.log(err)
    else console.log('Upload done: '+res);
});
