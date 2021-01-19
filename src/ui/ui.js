window.onload = function () {
  setTimeout(function () {
    var preloader = document.getElementById("loader");
    if (!preloader.classList.contains("done")) {
      preloader.classList.add("done");
    }
  }, 300);
};
