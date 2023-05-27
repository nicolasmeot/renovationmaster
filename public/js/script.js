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

function deadlineDate() {
  let date = document.getElementById("projectDeadlineInput").value;
  document.getElementById("projectDeadlineDate").innerHTML = date;
}
