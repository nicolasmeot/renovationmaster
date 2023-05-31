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

/* JS to listen to input change for an automatic upload of Room Img */
const uploadRoomImgForm = document.querySelector(".addRoomImg");
const uploadRoomImgWindow = document.querySelector(".addRoomImgWindow");

if (uploadRoomImgWindow) {
  uploadRoomImgWindow.addEventListener("change", () => {
    uploadRoomImgForm.submit();
  });
}

document.querySelectorAll(".dropdown-el").forEach(function (dropdown) {
  dropdown.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    dropdown.classList.toggle("expanded");
    document.getElementById(e.target.getAttribute("for")).checked = true;
  });
});

document.addEventListener("click", function () {
  document.querySelectorAll(".dropdown-el").forEach(function (dropdown) {
    dropdown.classList.remove("expanded");
  });
});
