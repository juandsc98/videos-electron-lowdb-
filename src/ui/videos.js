const { remote } = require("electron");
const main = remote.require("./main");

const notie = require("notie");

const electron = require("electron");
const path = require("path");
const BrowserWindow = electron.remote.BrowserWindow;
const mediaLists = document.getElementById("medias");
const mediaListsPresent = document.getElementById("mediasPresent");
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

let medias = [];
/*
function updateMedias() {
  notie.confirm({
    text: "¿Está seguro de actualizar el archivo?",
    cancelCallback: () =>
      notie.alert({ type: 2, text: "ok", position: "bottom" }),
    submitCallback: () => {
      const idMedia = document.getElementById("id");
      const name = document.getElementById("name");
      const time = document.getElementById("time");
      const url = document.getElementById("url");

      const updateMediaObject = {
        id: idMedia.value,
        name: name.value,
        time: time.value,
        url: url.value,
      };
      updateMediasClick(updateMediaObject);
      notie.alert({
        type: 1,
        text: "Actualizado correctamente",
        position: "bottom",
      });
    },
  });
}

async function updateMediasClick(media) {
  const result = await main.updateMedias(media);
  console.log(result);
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
*/
function deleteMedia(id, url) {
  notie.confirm({
    text: "¿Está seguro de eliminar el archivo?",
    cancelCallback: () =>
      notie.alert({ type: 2, text: "ok", position: "bottom" }),
    submitCallback: () => {
      const mediaId = document.getElementById(id);
      mediaId.classList.add("animate__animated");
      mediaId.classList.add("animate__bounceOut");
      setTimeout(() => {
        mediaId.remove();
      }, 800);
      deleteMediaClick(id, url);
      notie.alert({
        type: 1,
        text: "Eliminado correctamente",
        position: "bottom",
      });
    },
  });
}

async function deleteMediaClick(id, url) {
  const result = await main.deleteMedia(id, url);
  console.log(result);
}

function renderMedias(medias) {
  if (!medias.length) {
    return notie.alert({
      type: 3,
      text:
        "No existe ningún archivo multimedia para presentar. Por favor agregue archivos",
      position: "bottom",
    });
  } else {
    mediaLists.innerHTML = ``;
    medias.forEach((media) => {
      let videoHtml = /*html*/ `
        <video  id="${media.id}" controls class="img-fluid d-block m-auto" src="${media.url}" ></video>
        `;
      let imagenHtml = /*html*/ `
            <img  id="${media.id}" class="img-fluid d-block m-auto" src="${media.url}"/>
        `;
      let printMedia = ``;
      switch (media.type) {
        case "image/jpeg":
          printMedia = imagenHtml;
          break;
        case "image/png":
          printMedia = imagenHtml;
          break;
        case "image/gif":
          printMedia = imagenHtml;
          break;
        case "image/jpg":
          printMedia = imagenHtml;
          break;
        case "image/webp":
          printMedia = imagenHtml;
          break;
        case "video/ogg":
          printMedia = videoHtml;
          break;
        case "video/webm":
          printMedia = videoHtml;
          break;
        case "video/mp4":
          printMedia = videoHtml;
          break;

        default:
          break;
      }
      mediaLists.innerHTML += /*html*/ `
                <div class="col-xs-6 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-2" style="transition: all .4s" id="${media.id}">
                    <div class="card m-2" style="transition: all .4s">
                        <div class="card-title pt-4 px-4">
                            <p><strong>${media.name}</strong> | <small>${media.type}</small> | ${media.time} </p> 
                            
                        </div>
                        <div class="card-body">
                            ${printMedia}
                        </div>
                        <div class="card-footer p-4">
                            <a class="btn btn-primary" href="#" data-bs-toggle="modal" data-bs-target="#media${media.id}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                    <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z"/>
                                </svg>
                            </a>
                            <a class="btn btn-danger" onclick="deleteMedia('${media.id}', '${media.url}')">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                    <!-- Modal -->
                    <div class="modal fade" id="media${media.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-fullscreen modal-xl">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">${media.name}</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    ${printMedia}
                                </div>
                                <div class="modal-footer">
                                        <!-- 
                                        <div class="row">
                                            <div class="col mx-2">
                                                <label for="time" class="form-label">Tiempo de reproducción</label>
                                                <input type="text" id="time" value="${media.time}" class="form-control w-100" placeholder="Tiempo de reprodución">
                                            </div>
                                            <div class="col mx-2">
                                                <label for="name" class="form-label">Nombre de archivo</label>
                                                <input type="text" id="name" value="${media.name}" class="form-control w-100" placeholder="Nombre del archivo">
                                            </div>
                                            <div class="col mx-2">
                                                <label for="time" class="form-label">Ubicación</label>
                                                <input type="url" id="url" disabled value="${media.url}" class="form-control w-100" placeholder="Tiempo de reprodución">
                                            </div>
                                            <div class="col mx-2">
                                                <label for="id" class="form-label">id</label>
                                                <input type="url" id="mediaupdate${media.id}" disabled value="${media.id}" class="form-control w-100" placeholder="Tiempo de reprodución">
                                            </div>
                                        </div>
                                        <button type="button" class="btn mt-4 btn-success" id="actualizar" onclick="updateMedias()">Actualizar</button>
                                        -->
                                        <button type="button" class="btn mt-4 btn-secondary" data-bs-dismiss="modal">Close</button>
                                    
                                
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
            `;
    });
  }
}

const getMedias = async () => {
  medias = await main.getMedias();
  renderMedias(medias);
};

async function init() {
  await getMedias();
}

init();
