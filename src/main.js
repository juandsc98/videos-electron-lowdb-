const {
  BrowserWindow,
  Notification,
  app,
  dialog,
  ipcRenderer,
} = require("electron");

const username = require('username');
const { getConnection } = require("./database");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const { url } = require("inspector");
//const path = require("path");

async function getMedias() {
  const conn = await getConnection();
  const results = await conn.get("medias").value();
  return results;
}

async function updateMedias(media) {
  const result = await getConnection()
    .get("medias")
    .find({ id: media.id })
    .assign(media)
    .write();
  return result;
}

async function deleteMedia(id, url) {
  const conn = await getConnection();

  try {
    fs.unlink(url, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Archivo eliminado");
      }
    });

    const result = await getConnection()
      .get("medias")
      .remove({ id: id })
      .write();
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function createMedia(media) {
  media.url = '/home/'+ username.sync() +'/files_medias/' + media.nameMedia;
  const urlFile = '/home/'+ username.sync() +'/files_medias/' + media.nameMedia;
  try{
    fs.copyFile(media.mediaFile.path, urlFile, (error) => {
      if (error) {
        console.log(`error! : ${error}`);
      } else {
        console.log("Archivo copeado en" + urlFile);
      }
    });

    const newMedia = {
      id: uuidv4(),
      name: media.name,
      type: media.type,
      url: media.url,
      time: media.time,
    };

    getConnection().get("medias").push(newMedia).write();
    //const result = await

    return newMedia;
  } catch (error) {
    console.log(error);
  }
}

let window;

function createWindow() {
  window = new BrowserWindow({
    width: 1260,
    height: 710,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      sandbox: false
    },
  });

  window.loadFile("src/ui/index.html");
}

module.exports = {
  createWindow,
  createMedia,
  getMedias,
  deleteMedia,
  updateMedias,
};
