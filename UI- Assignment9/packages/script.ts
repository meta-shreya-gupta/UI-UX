class Employee {
    constructor(
        public fullName: string,
        public gender: string,
        public email: string,
        public password: string,
        public contact: string,
        public id: number = Math.floor(Math.random() * 10000) + 1
    ) { }
}

class Vehicle {
    constructor(
        public name: string,
        public type: string,
        public number: string,
        public employeeId: number,
        public identification: string
    ) { }
}

type VehicleType = "cycle" | "motorCycle" | "four-wheeler";
type PlanType = "daily" | "monthly" | "yearly";
type CurrencyType = "INR" | "USD" | "YEN";


class Pass {
    private prices: Record<VehicleType, Record<PlanType, number>> = {
        "cycle": { daily: 5, monthly: 100, yearly: 500 },
        "motorCycle": { daily: 10, monthly: 200, yearly: 1000 },
        "four-wheeler": { daily: 20, monthly: 500, yearly: 3500 }
    };

    constructor(
        private vehicleType: VehicleType,
        private plan: PlanType,
        private currency: CurrencyType
    ) { }

    getPriceInCurrency(): string {
        const rates: Record<CurrencyType, number> = {
            INR: 1,
            USD: 0.012,
            YEN: 1.63
        };

        const basePrice = this.prices[this.vehicleType][this.plan];
        if (!basePrice) throw new Error("Invalid vehicle or plan");

        const converted = basePrice * rates[this.currency];
        return `Price in ${this.currency}: ${converted.toFixed(2)}`;
    }
}


let employee: Employee;
let vehicle: Vehicle;

// DOM utility
const getInput = (id: string): HTMLInputElement =>
    document.getElementById(id) as HTMLInputElement;

const getElement = (id: string): HTMLElement =>
    document.getElementById(id) as HTMLElement;

// Step 1
const validateName = (): void => {
    const name = getInput("fullname").value.trim();
    const nameRegex = /^[A-Za-z ]{3,}$/;
    if (!nameRegex.test(name)) {
        alert("Name must be at least 3 characters and contain only letters.");
        return;
    }
    getElement("step1").style.display = "none";
    getElement("greet").innerText = `Hi ${name}, may I know your gender?`;
    getElement("step2").style.display = "block";
};

let genderStepActive = false;

document.addEventListener("keyup", (event) => {
    const step2 = getElement("step2");
    const isVisible = window.getComputedStyle(step2).display !== "none";

    if (isVisible && event.key === "Enter") {
        event.preventDefault();
        if (genderStepActive) {
            validateGender();
        } else {
            genderStepActive = true;
        }
    }
});

// Step 2
const validateGender = (): void => {
    const selected = [].slice.call(document.getElementsByName("gender")).some(
        (r) => (r as HTMLInputElement).checked
    );
    if (!selected) {
        alert("Please select your gender.");
        return;
    }
    getElement("step2").style.display = "none";
    getElement("step3").style.display = "block";
    getInput("email").focus();
};

// Step 3
const validateEmail = (): void => {
    const email = getInput("email").value.trim();
    if (email.indexOf("@")===-1 || email.indexOf(".com")===-1) {
        alert("Email must contain '@'.");
        return;
    }
    getElement("step3").style.display = "none";
    getElement("step4").style.display = "block";
    getInput("password").focus();
};

// Step 4: Password Strength
const passwordInput = getInput("password");
const passwordMsg = getInput("strengthColor");

passwordInput.addEventListener("input", () => {
    const password = passwordInput.value;
    const checks = {
        length: password.length >= 8,
        upper: /[A-Z]/.test(password),
        lower: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    let strengthColor = "red";

    if (!checks.length) passwordMsg.textContent = "Password must be at least 8 characters.";
    else if (!checks.upper) passwordMsg.textContent = "Password needs uppercase.";
    else if (!checks.lower) passwordMsg.textContent = "Password needs lowercase.";
    else if (!checks.number) passwordMsg.textContent = "Password needs number.";
    else if (!checks.special) passwordMsg.textContent = "Password needs special character.";
    else {
        passwordMsg.textContent = "Strong password chosen... Very Well done...";
        strengthColor = password.length < 10 ? "orange" : "green";

        document.addEventListener("keydown", (event) => {
            const step4 = getElement("step4");
            const isVisible = window.getComputedStyle(step4).display !== "none";
            if (isVisible && event.key === "Enter") {
                event.preventDefault();
                getElement("step4").style.display = "none";
                getElement("step5").style.display = "block";
                getInput("confirmPassword").focus();
            }
        });
    }

    passwordInput.style.border = `2px solid ${strengthColor}`;
});

// Step 5 confirm password
const validateConfirmPassword = (): void => {
    const pwd = getInput("password").value;
    const cpwd = getInput("confirmPassword").value;
    if (pwd !== cpwd) {
        alert("Passwords do not match.");
        return;
    }
    getElement("step5").style.display = "none";
    getElement("step6").style.display = "block";
    getInput("contact").focus();
};


// Step 6 contact
const validateContact = (): void => {
    const contact = getInput("contact").value.trim();
    const contactRegex = /^[0-9]{10}$/;
    if (!contactRegex.test(contact)) {
        alert("Contact must be 10 digits.");
        return;
    }
    //create employee object
    employee = new Employee(
        getInput("fullname").value.trim(),
        (document.querySelector('input[name="gender"]:checked') as HTMLInputElement).value,
        getInput("email").value.trim(),
        getInput("password").value,
        getInput("contact").value
    );
    console.log("Employee registered: " , employee);
    getElement("step6").style.display = "none";
    collapse();
};

//trigger contact validation on enter
document.getElementById("contact")?.addEventListener("keydown" , (e) =>{
    if(e.key ==="Enter"){
        e.preventDefault();
        validateContact();
    }
});

// Collapse and Show Vehicle Form
const collapse = (): void => {
    getElement("employeeSection").style.display = "none";
    (getInput("employee-checkbox") as HTMLInputElement).checked = false;
    const regId = Math.floor(Math.random() * 10000) + 1;
    const div = document.createElement("div");
    // div.textContent = `Employee Id : ${regId}`;
    getElement("employee").appendChild(div);
    getElement("vehicle").style.display = "block";
};

// Vehicle Form Navigation
const formVehicle = document.getElementById("AddVehicle") as HTMLFormElement;
const inputsVehicle = formVehicle.querySelectorAll(".form-element") as NodeListOf<HTMLElement>;
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
            const dropdown = nextInput.querySelector(".dropdown") as HTMLSelectElement;
            if (dropdown) nextInput.querySelector("label")!.textContent = "Which vehicle do you have?";
            nextInput.style.display = "block";
        }
    }
});

// Submit Vehicle
formVehicle.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("hellllllooooo");
    console.log(employee);
    vehicle = new Vehicle(
        getInput("vehicle-name").value.trim(),
        getInput("vehicle-type").value,
        getInput("vehicle-number").value.trim(),
        employee.id,
        getInput("vehicle-identification").value.trim()
    );
    console.log(vehicle);
    alert("object ban gya");
    console.log("Vehicle Registered: ", vehicle);
    alert("object diplay bhi ho gya");
    (getInput("vehicle-checkbox") as HTMLInputElement).checked = false;
    getElement("vehicle").style.display = "none";
    getElement("price").style.display = "block";
    alert("ab koi dikkat nhi");
});
// show pass pricing
getInput("vehicle-type").addEventListener("change", (e: Event) => {
    const selectedType = (e.target as HTMLSelectElement).value;
    document.querySelectorAll(".pricing-block").forEach((el) => {
        (el as HTMLElement).style.display = "none";
    });
    if (selectedType) {
        getElement(selectedType).style.display = "block";
    }
});

// Plan Selection Button
document.querySelectorAll(".btn.purchase").forEach((btn) =>
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        getElement("selection").style.display = "block";
    })
);

// Get Pass
getInput("get-pass").addEventListener("click", () => {
    const vehicleType = getInput("vehicle-type").value as VehicleType;
    const plan = getInput("planSelect").value as 'daily' | 'monthly' | 'yearly';
    const currency = getInput("currencySelect").value as 'USD' | 'YEN';
    const priceDisplay = getElement("priceDisplay");

    try {
        const pass = new Pass(vehicleType, plan , currency);
        const price = pass.getPriceInCurrency();
        priceDisplay.textContent = `Price in ${currency}: ${currency === "USD" ? "$" : "¥"}${price}`;
        alert(`Final price to be saved (in USD): $${pass.getPriceInCurrency()}`);
    } catch (err) {
        alert((err as Error).message);
    }
});