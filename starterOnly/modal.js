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
const form = document.getElementById("reserveForm");

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

// function: check if each field respect conditions, if not, show error
const checkFields = () => {
  // function: reset all errors
  formData.forEach((group) => {
    group.setAttribute("data-error-visible", "false");
  });
  formError = false;
  // get all the required fields as an array
  const requiredInputs = [
    ...document.querySelectorAll("#reserveForm input[required]"),
  ];
  // checking for error for each input
  requiredInputs.forEach((input) => {
    if (input.getAttribute("type") === "text") {
      // if the lentgth of a field is less than its 'minlength' attribute, show error
      if (input.value.length < input.getAttribute("minlength")) {
        setError(input);
      }
    }
    // if the value of an email field is not formatted correctly, show error
    if (input.getAttribute("type") === "email") {
      if (
        !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          input.value
        )
      ) {
        setError(input);
      }
    }
    // if a required checkbox is not checked, show error
    if (input.getAttribute("type") === "checkbox") {
      if (!input.checked) {
        setError(input);
      }
    }
    // for all other required field; we just expect them to be filled, if not, show error
    else {
      if (input.value.length < 1) {
        setError(input);
      }
    }
  });
  // checking if at least one radio button is selected
  if (!document.querySelectorAll("input[type=radio]:checked").length > 0) {
    setError(document.querySelector("input[type=radio]"));
  }
};

// event listener for the form submission
form.addEventListener("submit", (e) => {
  // stop the regular form behavior
  e.preventDefault();
  // fields validation
  checkFields();
  // if validation fails, stop the submitting
  if (formError) {
    return false;
  }
  // if validation succeeds, show the success message and submit
  document.querySelector(".success-modal").classList.add("visible");
  setTimeout(() => {
    form.submit();
  }, "3000");
});
