document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("renovMaster imported successfully");
  },
  false
);

function iconClick(element) {
  let items = document.getElementsByClassName("statusIcon");
  for (let i = 0; i < items.length; i++) {
    items[i].classList.remove("active");
  }

  element.classList.add("active");
}

/* JS to listen to input change for an automatic upload of Floor plan */
const uploadPlanForm = document.querySelector(".addPhotoForm");
const uploadPlanWindow = document.querySelector(".addPhotoWindow");

if (uploadPlanWindow) {
  uploadPlanWindow.addEventListener("change", () => {
    uploadPlanForm.submit();
  });
}

/* JS to listen to input change for an automatic upload of initial Room Img */
const uploadRoomImgFormInit = document.querySelector(".addRoomImgInit");
const uploadRoomImgWindowInit = document.querySelector(".addRoomImgWindowInit");

if (uploadRoomImgWindowInit) {
  uploadRoomImgWindowInit.addEventListener("change", () => {
    uploadRoomImgFormInit.submit();
  });
}

/* JS to listen to input change for an automatic upload of initial Room Img */
const uploadRoomImgFormCurr = document.querySelector(".addRoomImgCurr");
const uploadRoomImgWindowCurr = document.querySelector(".addRoomImgWindowCurr");

if (uploadRoomImgWindowCurr) {
  uploadRoomImgWindowCurr.addEventListener("change", () => {
    uploadRoomImgFormCurr.submit();
  });
}

/* JS to listen to input change for an automatic upload of initial Room Img */
const uploadRoomImgForm3d = document.querySelector(".addRoomImg3d");
const uploadRoomImgWindow3d = document.querySelector(".addRoomImgWindow3d");

if (uploadRoomImgWindow3d) {
  uploadRoomImgWindow3d.addEventListener("change", () => {
    uploadRoomImgForm3d.submit();
  });
}
