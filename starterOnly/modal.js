function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal
function closeModal() {
  modalbg.style.display = "none";
}

// form validation
function validate(e) {
  const firstNameInput = document.getElementById("first").value;
  const lastNameInput = document.getElementById("last").value;
  const emailInput = document.getElementById("email").value;
  const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const birthDateInput = document.getElementById("birthdate").value;
  const quantityInput = document.getElementById("quantity").value;
  const location1 = document.getElementById("location1");
  const location2 = document.getElementById("location2");
  const location3 = document.getElementById("location3");
  const location4 = document.getElementById("location4");
  const location5 = document.getElementById("location5");
  const location6 = document.getElementById("location6");
  const checkbox1 = document.getElementById("checkbox1");
  let formError = false;

  if (!firstNameInput.length > 1) {
    formError = true;
  }
  if (!lastNameInput.length > 1) {
    formError = true;
  }
  if (!emailInput.match(validEmail)) {
    formError = true;
  }
  if (isNaN(quantityInput) || quantityInput.length === 0) {
    formError = true;
  }
  if (birthDateInput.length === 0) {
    formError = true;
  }
  if (
    !location1.checked &&
    !location2.checked &&
    !location3.checked &&
    !location4.checked &&
    !location5.checked &&
    !location6.checked
  ) {
    formError = true;
  }
  if (!checkbox1.checked) {
    formError = true;
  }
  if (formError) {
    return false;
  }
}
