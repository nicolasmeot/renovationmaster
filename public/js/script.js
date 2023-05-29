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

const uploadPlanForm = document.querySelector(".floorPlanForm");
const uploadPlanWindow = document.querySelector(".floorPlanWindow");

if (uploadPlanWindow) {
  uploadPlanWindow.addEventListener("change", () => {
    uploadPlanForm.submit();
  });
}

const uploadRoomImgForm = document.querySelector(".addRoomImg");
const uploadRoomImgWindow = document.querySelector(".addRoomImgWindow");

if (uploadRoomImgWindow) {
  uploadRoomImgWindow.addEventListener("change", () => {
    uploadRoomImgForm.submit();
  });
}
