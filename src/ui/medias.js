const { remote } = require("electron");
const main = remote.require("./main");

const notie = require("notie");

const mediaListsPresent = document.getElementById("mediasPresent");

let medias = [];

function renderMediasPresent(medias) {
  if (!medias.length) {
    return notie.alert({
      type: 3,
      text:
        "No existe ningún archivo multimedia para presentar. Por favor agregue archivos",
      position: "bottom",
    });
  } else {
    mediaListsPresent.innerHTML = ``;
    medias.forEach((media) => {
      let videoHtml = /*html*/ `
    <video class=" d-block video m-auto" src="${media.url}" ></video>
    `;

      let imagenHtml = /*html*/ `
        <img class="w-100 d-block imagen m-auto" src="${media.url}"/>
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
      mediaListsPresent.innerHTML += /*html*/ `
        <div class="swiper-slide"  id="${media.id}" data-swiper-autoplay="${media.time}">${printMedia}</div>
           
        `;
    });
  }
}

const getMedias = async () => {
  medias = await main.getMedias();
  renderMediasPresent(medias);
};

async function init() {
  await getMedias();
}

init();
