// Step 1: Validate Full Name
const validateName = (event) => {
    if (event) event.preventDefault();
    const name = document.getElementById('fullname').value.trim();
    const nameRegex = /^[A-Za-z ]{3,}$/;
    if (!nameRegex.test(name)) {
        alert("Name must be at least 3 characters and contain only letters.");
        return false;
    }
    document.getElementById('step1').style.display = "none";
    document.getElementById('greet').innerText = `Hi ${name}, may I know your gender?`;
    document.getElementById('step2').style.display = "block";
    return false;
};


document.addEventListener('keydown', function (event) {
    const step2 = document.getElementById("step2");
    const isVisible = window.getComputedStyle(step2).display !== "none";
    if (isVisible && event.key === "Enter") {
        event.preventDefault();
        validateGender();
    }
});
// Step 2: Validate Gender
const validateGender = () => {
    const selected = [...document.getElementsByName('gender')].some(r => r.checked);
    if (!selected) {
        alert("Please select your gender.");
        return;
    }
    document.getElementById('step2').style.display = "none";
    document.getElementById('step3').style.display = "block";
    document.getElementById('email').focus();
};

// Step 3: Validate Email
const validateEmail = (event) => {
    if (event) event.preventDefault();
    const email = document.getElementById('email').value.trim();
    if (!email.includes("@")) {
        alert("Email must contain '@'.");
        return false;
    }
    document.getElementById('step3').style.display = "none";
    document.getElementById('step4').style.display = "block";
    document.getElementById('password').focus();
    return false;
};

// Step 4: Validate Password
const validatePassword = (event) => {
    if (event) event.preventDefault();
    const password = document.getElementById('password').value;
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{9,}$/;
    if (!regex.test(password)) {
        alert("Password must include uppercase, lowercase, special character, and be at least 9 characters.");
        return false;
    }
    document.getElementById('step4').style.display = "none";
    document.getElementById('step5').style.display = "block";
    document.getElementById('confirmPassword').focus();
    return false;
};

// Step 5: Confirm Password
const validateConfirmPassword = (event) => {
    if (event) event.preventDefault();
    const pwd = document.getElementById('password').value;
    const cpwd = document.getElementById('confirmPassword').value;
    if (pwd !== cpwd) {
        alert("Passwords do not match.");
        return false;
    }
    document.getElementById('step5').style.display = "none";
    document.getElementById('step6').style.display = "block";
    document.getElementById('contact').focus();
    return false;
};

// Step 6: Validate Contact
const validateContact = (event) => {
    if (event) event.preventDefault();
    const contact = document.getElementById('contact').value.trim();
    const contactRegex = /^[0-9]{10}$/;
    if (!contactRegex.test(contact)) {
        alert("Contact number must be exactly 10 digits.");
        return false;
    }
    document.getElementById('step6').style.display = "none";
    collapse();
    return false;
};

// Finalize & Show Vehicle Form
const collapse = () => {
    document.getElementById("employeeSection").style.display = "none";
    document.getElementById("employee-checkbox").checked = false;
    const regId = Math.floor(Math.random() * 10000) + 1;
    const text = document.createElement("div");

    text.textContent = `Employee Id : ${regId}`;
    document.getElementById("employee").appendChild(text);
    document.getElementById("vehicle").style.display = "block";
};

// Vehicle Step Navigation
const formVehicle = document.getElementById("vehicle");
const inputsVehicle = formVehicle.querySelectorAll(".form-element");
let vehicleStep = 0;

inputsVehicle.forEach((input, index) => {
    if (index !== 0) input.style.display = "none";
});

formVehicle.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        if (vehicleStep < inputsVehicle.length - 1) {
            inputsVehicle[vehicleStep].style.display = "none";
            vehicleStep++;
            const nextInput = inputsVehicle[vehicleStep];
            if (nextInput.querySelector(".dropdown")) {
                nextInput.querySelector("label").textContent = "Which vehicle do you have?";
            }
            nextInput.style.display = "block";
        }
    }
});

// Submit Vehicle Form
formVehicle.addEventListener("submit", (event) => {
    event.preventDefault();
    document.getElementById("vehicle-checkbox").checked = false;
    document.getElementById("price").style.display = "block";
});

// Handle Vehicle Type Selection
document.getElementById("vehicle-type").addEventListener("change", (e) => {
    const selectedType = e.target.value;
    document.querySelectorAll(".pricing-block").forEach(block => {
        block.style.display = "none";
    });
    if (selectedType) {
        document.getElementById(selectedType).style.display = "block";
    }
});

// Display Plan Selection
document.querySelectorAll(".btn.purchase").forEach(button => {
    button.addEventListener("click", (event) => {
        event.preventDefault();
        document.getElementById("selection").style.display = "block";
    });
});

// Currency Conversion & Price Display
document.getElementById("get-pass").addEventListener("click", () => {
    const INRtoUSD = 0.012;
    const INRtoYEN = 1.63;

    const vehicleType = document.getElementById("vehicle-type").value;
    const plan = document.getElementById("planSelect").value;
    const currency = document.getElementById("currencySelect").value;
    const priceDisplay = document.getElementById("priceDisplay");

    const prices = {
        "cycle": { daily: 5, monthly: 100, yearly: 500 },
        "motorCycle": { daily: 10, monthly: 200, yearly: 1000 },
        "four-wheeler": { daily: 20, monthly: 500, yearly: 3500 }
    };

    const basePrice = prices[vehicleType]?.[plan];
    if (!basePrice) {
        alert("Invalid vehicle or plan selection.");
        return;
    }

    let converted;
    if (currency === "USD") {
        converted = (basePrice * INRtoUSD).toFixed(2);
        priceDisplay.textContent = `Price in USD: $${converted}`;
    } else if (currency === "YEN") {
        converted = (basePrice * INRtoYEN).toFixed(2);
        priceDisplay.textContent = `Price in YEN: ¥${converted}`;
    }

    const usdPrice = (basePrice * INRtoUSD).toFixed(2);
    alert(`Final price to be saved (in USD): $${usdPrice}`);
});