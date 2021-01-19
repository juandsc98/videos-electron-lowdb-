const { createWindow } = require("./main");
const { app } = require("electron");
const username = require('username');
const fs = require('fs');

console.log( username.sync() );
/*
fs.stat('/home/'+ username.sync() +'/files_medias', function(err) {
    if (!err) {
        console.log('file or directory exists');
    }
    else{
      fs.mkdirSync('/home/'+ username.sync() +'/files_medias',{recursive:true});
    }
});
*/
fs.mkdirSync('/home/'+ username.sync() +'/files_medias',{recursive:true});
const { createConnection } = require("./database");
createConnection();
require("electron-reload")(__dirname);

app.allowRendererProcessReuse = false;
app.whenReady().then(createWindow);
