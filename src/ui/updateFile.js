const { remote } = require("electron");
const electron = require("electron");
const path = require("path");
const BrowserWindow = electron.remote.BrowserWindow;
const main = remote.require("./main");

const actualizar = document.getElementById("actualizar");
const name = document.getElementById("name");
const time = document.getElementById("time");
const url = document.getElementById("url");

actualizar.addEventListener("click", async (e) => {
  e.preventDefault();
  if (name.value == "" || name.value == "") {
    return notie.alert({
      type: 3,
      text: "Ningún campo debe estar vacío al actualizar",
      position: "bottom",
    });
  } else {
    const newMedia = {
      name: name.value,
      time: time.value,
      url: url.value,
    };
    const result = await main.createMedia(newMedia);
    if (result) {
      notie.alert({
        type: 1,
        text: "Archivo creado correctamente",
        position: "bottom",
      });
    } else {
      return notie.alert({
        type: 3,
        text:
          "Hubo un error al guardar. Por favor comunique el error al desarollador",
        position: "bottom",
      });
    }
  }
});
