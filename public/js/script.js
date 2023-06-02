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

// Sort bar
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

// Edit room content
function attachFormEventListener() {
  let forms = document.getElementsByClassName("attachForm");
  for (let i = 0; i < forms.length; i++) {
    forms[i].addEventListener("submit", function (event) {
      // Cette ligne event.preventDefault() est juste pour test de dom pour voir si ca marche ou pas
      // A supprimer une fois qu'on puisse inserer les donness du server
      // event.preventDefault();

      let inputtedText =
        document.getElementsByClassName("attachFormInput")[i].value;

      // Ajouter inputtedText et ajouter un lien de edit
      document.getElementsByClassName("attachInfo")[i].innerHTML = `
              <p class="attachInfo">${inputtedText}</p>
              <div id="editRoomDescriptionBtn" class="editDeleteBtn2">
                <img class="editIcon" src="/images/edit.svg" alt="editIcon">
                <a class="editDeleteLink" href="#">Edit / delete room</a>
              </div>
      
          `;

      // Ajouter eventlistener pour editdelete button et remplacer le text par un form
      document
        .getElementsByClassName("editDeleteBtn2")
        [i].addEventListener("click", function () {
          // Afficher delete link apres avoir cliquer sur edit/delete button
          deleteItem[i].style.display = "inline";

          document.getElementsByClassName("attachInfo")[i].innerHTML = `
                  <form class="attachForm">
                      <input type="text" class="attachFormInput" value="${inputtedText}">
                      <input type="submit" class="saveButton" value="Save">
                  </form>
              `;
          // Attacher encore eventlistener
          attachFormEventListener();
        });
    });
  }
}

attachFormEventListener();

let editItem = document.getElementsByClassName("editDeleteBtn2");
let deleteItem = document.getElementsByClassName("hiddenDeleteBtn");

for (let i = 0; i < editItem.length; i++) {
  editItem[i].addEventListener("click", function (event) {
    deleteItem[i].style.display = "inline";
  });
}
