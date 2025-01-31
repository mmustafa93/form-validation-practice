const email = document.getElementById("mail");
const countrySelect = document.getElementById("country");
const zipSelect = document.getElementById("zip");
const formElement = document.querySelector('form');
const password = document.getElementById("pass");
const confirmPassword = document.getElementById("confirm-pass");
const passwordError = document.getElementById("pass-error");
const confirmPassError = document.getElementById("confirm-pass-error");
const emailError = document.querySelector('#email-error');
const inputs = document.querySelectorAll("input, select"); // Select all input and select elements
const countryError = document.querySelector('#country-error');
const zipError = document.querySelector('#zip-error');
    
inputs.forEach(input => input.setAttribute("required", true));

const zipCodes = {
    us: ["10001", "90210", "33101"],
    ca: ["M5A 1A1", "V6B 3K9", "H3Z 2Y7"],
    uk: ["SW1A 1AA", "E1 6AN", "M1 1AE"]
};


email.addEventListener("input", (event) => {
  if (email.validity.typeMismatch) {
    email.setCustomValidity("I am expecting an email address!");
    emailError.textContent = email.validationMessage;
  } else {
    email.setCustomValidity("");
    emailError.textContent = ""
  }
});

countrySelect.addEventListener("change", () => {
    if (countrySelect.value){
        updateZipCodes();
        countrySelect.setCustomValidity("")
        countryError.textContent = "";
    } else {
        countrySelect.setCustomValidity("Please Select a Country!");
        countryError.textContent = countrySelect.validationMessage;
    }
});

zipSelect.addEventListener("change", () => {
    if (zipSelect.value){
        zipSelect.setCustomValidity("");
        zipError.textContent = ""
    } else {
        zipSelect.setCustomValidity("Please Select a Zip Code");
        zipError.textContent = zipSelect.validationMessage;
    }
});

function updateZipCodes() {
    const country = countrySelect.value;
    zipSelect.innerHTML = '<option value="">Select a zip code</option>'; // Reset options

    if (zipCodes[country]) {
        zipCodes[country].forEach(zip => {
        const option = document.createElement("option");
        option.value = zip;
        option.textContent = zip;
        zipSelect.appendChild(option);
        });
    }
}

function validatePassword() {
    const passwordValue = password.value;
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,30}$/; // Regex for password validation

    if (!passwordPattern.test(passwordValue)) {
        password.setCustomValidity("Password must be 8-30 characters long, include 1 uppercase letter, 1 symbol, and 1 number.");
        passwordError.textContent = password.validationMessage;
        return false;
    } else {
        password.setCustomValidity("");
        passwordError.textContent = "";
        return true;
    }
    
}

function validateConfirmPassword() {
    if (password.value !== confirmPassword.value) {
        confirmPassword.setCustomValidity("Passwords do not match!");
        confirmPassError.textContent = confirmPassword.validationMessage;
        return false;
    } else {
        confirmPassword.setCustomValidity("");
        confirmPassError.textContent = "";
        return true;
    }
}

password.addEventListener("input", validatePassword);
confirmPassword.addEventListener("input", validateConfirmPassword);

formElement.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

    // Trigger all validations
    const isFormValid =
        email.checkValidity() &&
        countrySelect.checkValidity() &&
        zipSelect.checkValidity() &&
        validatePassword() &&
        validateConfirmPassword();

    if (isFormValid) {
        alert('High Five!');
    } else {
        alert('Make sure the data is filled in the right format!');
        formElement.reportValidity(); // Show built-in browser validation messages
    }
});