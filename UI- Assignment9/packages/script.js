var _a;
var Employee = /** @class */ (function () {
    function Employee(fullName, gender, email, password, contact, id) {
        if (id === void 0) { id = Math.floor(Math.random() * 10000) + 1; }
        this.fullName = fullName;
        this.gender = gender;
        this.email = email;
        this.password = password;
        this.contact = contact;
        this.id = id;
    }
    return Employee;
}());
var Vehicle = /** @class */ (function () {
    function Vehicle(name, type, number, employeeId, identification) {
        this.name = name;
        this.type = type;
        this.number = number;
        this.employeeId = employeeId;
        this.identification = identification;
    }
    return Vehicle;
}());
var Pass = /** @class */ (function () {
    function Pass(vehicleType, plan, currency) {
        this.vehicleType = vehicleType;
        this.plan = plan;
        this.currency = currency;
        this.prices = {
            "cycle": { daily: 5, monthly: 100, yearly: 500 },
            "motorCycle": { daily: 10, monthly: 200, yearly: 1000 },
            "four-wheeler": { daily: 20, monthly: 500, yearly: 3500 }
        };
    }
    Pass.prototype.getPriceInCurrency = function () {
        var rates = {
            INR: 1,
            USD: 0.012,
            YEN: 1.63
        };
        var basePrice = this.prices[this.vehicleType][this.plan];
        if (!basePrice)
            throw new Error("Invalid vehicle or plan");
        var converted = basePrice * rates[this.currency];
        return "Price in ".concat(this.currency, ": ").concat(converted.toFixed(2));
    };
    return Pass;
}());
var employee;
var vehicle;
// DOM utility
var getInput = function (id) {
    return document.getElementById(id);
};
var getElement = function (id) {
    return document.getElementById(id);
};
// Step 1
var validateName = function () {
    var name = getInput("fullname").value.trim();
    var nameRegex = /^[A-Za-z ]{3,}$/;
    if (!nameRegex.test(name)) {
        alert("Name must be at least 3 characters and contain only letters.");
        return;
    }
    getElement("step1").style.display = "none";
    getElement("greet").innerText = "Hi ".concat(name, ", may I know your gender?");
    getElement("step2").style.display = "block";
};
var genderStepActive = false;
document.addEventListener("keyup", function (event) {
    var step2 = getElement("step2");
    var isVisible = window.getComputedStyle(step2).display !== "none";
    if (isVisible && event.key === "Enter") {
        event.preventDefault();
        if (genderStepActive) {
            validateGender();
        }
        else {
            genderStepActive = true;
        }
    }
});
// Step 2
var validateGender = function () {
    var selected = [].slice.call(document.getElementsByName("gender")).some(function (r) { return r.checked; });
    if (!selected) {
        alert("Please select your gender.");
        return;
    }
    getElement("step2").style.display = "none";
    getElement("step3").style.display = "block";
    getInput("email").focus();
};
// Step 3
var validateEmail = function () {
    var email = getInput("email").value.trim();
    if (email.indexOf("@") === -1 || email.indexOf(".com") === -1) {
        alert("Email must contain '@'.");
        return;
    }
    getElement("step3").style.display = "none";
    getElement("step4").style.display = "block";
    getInput("password").focus();
};
// Step 4: Password Strength
var passwordInput = getInput("password");
var passwordMsg = getInput("strengthColor");
passwordInput.addEventListener("input", function () {
    var password = passwordInput.value;
    var checks = {
        length: password.length >= 8,
        upper: /[A-Z]/.test(password),
        lower: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    var strengthColor = "red";
    if (!checks.length)
        passwordMsg.textContent = "Password must be at least 8 characters.";
    else if (!checks.upper)
        passwordMsg.textContent = "Password needs uppercase.";
    else if (!checks.lower)
        passwordMsg.textContent = "Password needs lowercase.";
    else if (!checks.number)
        passwordMsg.textContent = "Password needs number.";
    else if (!checks.special)
        passwordMsg.textContent = "Password needs special character.";
    else {
        passwordMsg.textContent = "Strong password chosen... Very Well done...";
        strengthColor = password.length < 10 ? "orange" : "green";
        document.addEventListener("keydown", function (event) {
            var step4 = getElement("step4");
            var isVisible = window.getComputedStyle(step4).display !== "none";
            if (isVisible && event.key === "Enter") {
                event.preventDefault();
                getElement("step4").style.display = "none";
                getElement("step5").style.display = "block";
                getInput("confirmPassword").focus();
            }
        });
    }
    passwordInput.style.border = "2px solid ".concat(strengthColor);
});
// Step 5 confirm password
var validateConfirmPassword = function () {
    var pwd = getInput("password").value;
    var cpwd = getInput("confirmPassword").value;
    if (pwd !== cpwd) {
        alert("Passwords do not match.");
        return;
    }
    getElement("step5").style.display = "none";
    getElement("step6").style.display = "block";
    getInput("contact").focus();
};
// Step 6 contact
var validateContact = function () {
    var contact = getInput("contact").value.trim();
    var contactRegex = /^[0-9]{10}$/;
    if (!contactRegex.test(contact)) {
        alert("Contact must be 10 digits.");
        return;
    }
    //create employee object
    employee = new Employee(getInput("fullname").value.trim(), document.querySelector('input[name="gender"]:checked').value, getInput("email").value.trim(), getInput("password").value, getInput("contact").value);
    console.log("Employee registered: ", employee);
    getElement("step6").style.display = "none";
    collapse();
};
//trigger contact validation on enter
(_a = document.getElementById("contact")) === null || _a === void 0 ? void 0 : _a.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        validateContact();
    }
});
// Collapse and Show Vehicle Form
var collapse = function () {
    getElement("employeeSection").style.display = "none";
    getInput("employee-checkbox").checked = false;
    var regId = Math.floor(Math.random() * 10000) + 1;
    var div = document.createElement("div");
    // div.textContent = `Employee Id : ${regId}`;
    getElement("employee").appendChild(div);
    getElement("vehicle").style.display = "block";
};
// Vehicle Form Navigation
var formVehicle = document.getElementById("AddVehicle");
var inputsVehicle = formVehicle.querySelectorAll(".form-element");
var vehicleStep = 0;
inputsVehicle.forEach(function (input, index) {
    if (index !== 0)
        input.style.display = "none";
});
formVehicle.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        if (vehicleStep < inputsVehicle.length - 1) {
            inputsVehicle[vehicleStep].style.display = "none";
            vehicleStep++;
            var nextInput = inputsVehicle[vehicleStep];
            var dropdown = nextInput.querySelector(".dropdown");
            if (dropdown)
                nextInput.querySelector("label").textContent = "Which vehicle do you have?";
            nextInput.style.display = "block";
        }
    }
});
// Submit Vehicle
formVehicle.addEventListener("submit", function (event) {
    event.preventDefault();
    alert("hellllllooooo");
    console.log(employee);
    vehicle = new Vehicle(getInput("vehicle-name").value.trim(), getInput("vehicle-type").value, getInput("vehicle-number").value.trim(), employee.id, getInput("vehicle-identification").value.trim());
    console.log(vehicle);
    alert("object ban gya");
    console.log("Vehicle Registered: ", vehicle);
    alert("object diplay bhi ho gya");
    getInput("vehicle-checkbox").checked = false;
    getElement("vehicle").style.display = "none";
    getElement("price").style.display = "block";
    alert("ab koi dikkat nhi");
});
// show pass pricing
getInput("vehicle-type").addEventListener("change", function (e) {
    var selectedType = e.target.value;
    document.querySelectorAll(".pricing-block").forEach(function (el) {
        el.style.display = "none";
    });
    if (selectedType) {
        getElement(selectedType).style.display = "block";
    }
});
// Plan Selection Button
document.querySelectorAll(".btn.purchase").forEach(function (btn) {
    return btn.addEventListener("click", function (e) {
        e.preventDefault();
        getElement("selection").style.display = "block";
    });
});
// Get Pass
getInput("get-pass").addEventListener("click", function () {
    var vehicleType = getInput("vehicle-type").value;
    var plan = getInput("planSelect").value;
    var currency = getInput("currencySelect").value;
    var priceDisplay = getElement("priceDisplay");
    try {
        var pass = new Pass(vehicleType, plan, currency);
        var price = pass.getPriceInCurrency();
        priceDisplay.textContent = "Price in ".concat(currency, ": ").concat(currency === "USD" ? "$" : "¥").concat(price);
        alert("Final price to be saved (in USD): $".concat(pass.getPriceInCurrency()));
    }
    catch (err) {
        alert(err.message);
    }
});
