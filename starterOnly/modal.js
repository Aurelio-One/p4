/** 
 * @function editNav
 * show/hide the mobile menu 
*/
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
const form = document.querySelector("form");

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

/** 
 * @function setError
 * @param field
 * show the error for a field
 */
const setError = (field) => {
  field.parentNode.setAttribute("data-error-visible", "true");
  formError = true;
};

/** 
 * @function validate
 * validate all fields before subtmitting the form
 */
const validate = () => {
  // reset all errors
  formData.forEach((formdata) => {
    formdata.setAttribute("data-error-visible", "false");
  });
  formError = false;
  //check for fields validity
  //// create a map with fields to check tied to the validation function that needs to be run
  const validation = new Map([
    [document.getElementById("first"), validLength],
    [document.getElementById("last"), validLength],
    [document.getElementById("email"), validEmail],
    [document.getElementById("birthdate"), validDate],
    [document.getElementById("quantity"), validNumber],
    [document.getElementById("checkbox1"), validChecked],
  ]);
  //// for each key of the map, run the function set as the key
  validation.forEach((key, value) => {
    key(value);
  });
};

/** 
 * @function validLength
 * @param input
 * check if the length of an input value is at least 2 characters
 */
const validLength = (input) => {
  if (input.value.length < 2) {
    setError(input);
  }
};

/** 
 * @function validEmail
 * @param input
 * check if an email is formatted correctly
 */
const validEmail = (input) => {
  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input.value)) {
    setError(input);
  }
};

/**
 * @function validDate
 * @param input
 * check if a date is formatted correctly
 */
const validDate = (input) => {
  if (isNaN(Date.parse(input.value))) {
    setError(input);
  }
};

/**
 * @function validNumber
 * @param input
 * check if an input value is a number
 */
const validNumber = (input) => {
  if (!/\d+/.test(input.value)) {
    setError(input);
  }
};

/** 
 * @function validChecked
 * @param input
 * check if the checkbox is checked
 */
const validChecked = (input) => {
  if (!input.checked) {
    setError(input);
  }
};

// event listener for the form submission
form.addEventListener("submit", (e) => {
  // stop the regular form behavior
  e.preventDefault();
  // fields validation
  validate();
  // if validation fails, stop the submitting
  if (formError) {
    return false;
  }
  // if validation succeeds, show the success message
  document.querySelector(".success-modal").classList.add("visible");
});