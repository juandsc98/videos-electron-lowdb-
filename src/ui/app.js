const notie = require("notie");
const mediaForm = document.getElementById("mediaForm");

const { remote } = require("electron");
const electron = require("electron");
const path = require("path");
const BrowserWindow = electron.remote.BrowserWindow;
const main = remote.require("./main");

const mediaName = document.getElementById("name");
const time = document.getElementById("time");
const guardar = document.getElementById("guardar");

const file = document.getElementById("file");

/*-------    Open Present Window  -------*/
const notifyBtn = document.getElementById("presentar");

notifyBtn.addEventListener("click", function (event) {
  const modalPath = path.join('file://' + __dirname + '/media.html');
  let win = new BrowserWindow({
    width: 1270,
    height: 720,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      sandbox: false
    },
  });
  win.on("close", function () {
    win = null;
  });
  win.loadURL(modalPath);
  win.show();
});

/*-------    Upload File -------*/

guardar.addEventListener("click", async (e) => {
  e.preventDefault();

  if (mediaName.value == "" || file.files[0] == undefined) {
    return notie.alert({
      type: 3,
      text: "Debe llenar todos los campos y adjuntar un archivo",
      position: "bottom",
    });
  } else {
    const newMedia = {
      name: mediaName.value,
      nameMedia: file.files[0].name,
      type: file.files[0].type,
      time: time.value,
      mediaFile: file.files[0],
      time: time.value,
      url: "",
    };
    const result = await main.createMedia(newMedia);
    if (result) {
      notie.alert({
        type: 1,
        text: "Archivo creado correctamente",
        position: "bottom",
      });
      let fileView = document.getElementById("preview");
      let fileUrl = document.getElementById("file-return");
      fileUrl.removeChild(fileUrl.firstChild);
      fileView.removeChild(fileView.firstChild);
    } else {
      return notie.alert({
        type: 3,
        text:
          "Hubo un error al guardar. Por favor comunique el error al desarollador",
        position: "bottom",
      });
    }

    mediaForm.reset();
  }
});
