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

// function: show the error for a field
const setError = (field) => {
  field.parentNode.setAttribute("data-error-visible", "true");
  formError = true;
};

// function: validate all fields before subtmitting the form
const validate = () => {
  // function: reset all errors
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
    [[...document.querySelectorAll(`[id^="location"]`)], validSelected],
  ]);
  //// for each key of the map, run the function set as the key
  validation.forEach((key, value) => {
    key(value);
  });
};

// function: check if the length of an input value is at least 2 characters
const validLength = (input) => {
  if (input.value.length < 2) {
    setError(input);
  }
};
// function: check if an email is formatted correctly
const validEmail = (input) => {
  if (
    !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      input.value
    )
  ) {
    setError(input);
  }
};
// function: check if a date is formatted correctly
const validDate = (input) => {
  if (isNaN(Date.parse(input.value))) {
    setError(input);
  }
};
// function: check if an input value is a number
const validNumber = (input) => {
  if (isNaN(input.value) || input.value.length === 0) {
    setError(input);
  }
};
// function: check if the checkbox is checked
const validChecked = (input) => {
  if (!input.checked) {
    setError(input);
  }
};
// function: check if the at least one radio button is selected
const validSelected = (group) => {
  if (group.every((input) => !input.checked)) {
    setError(group[0]);
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
  // if validation succeeds, show the success message and submit after 3sec
  document.querySelector(".success-modal").classList.add("visible");
  setTimeout(() => {
    form.submit();
  }, "3000");
});
