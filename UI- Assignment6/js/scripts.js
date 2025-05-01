let currentStep = 1;
// iterate one by one on each of form element
function showNextStep(){
    const current = document.getElementById(`step-${currentStep}`);
    const next = document.getElementById(`step-${currentStep + 1}`);
    if(next){
        current.style.display = 'none';
        next.style.display = 'block';
        currentStep ++;
    }
    else if(currentStep == 6){
        document.getElementById('employee-form').style.display = 'none';
        document.getElementById('vehicle-form').style.display = 'flex';
        document.getElementById('step-7').style.display = 'block';
        currentStep=7 ;
    }
}
//event listener for full name
document.getElementById('name').addEventListener('keydown' , function(e) {
    if(e.key == 'Enter'){
        e.preventDefault();
        showNextStep();
    }
}); 
//event listener for radio buttons
const genderRadios = document.getElementsByName('gender');
genderRadios.forEach(radio =>{
    radio.addEventListener('change' , function() {
        showNextStep();
    });
});
//event listener for email 
document.getElementById('email').addEventListener('keydown' , function(e) {
    if(e.key == 'Enter'){
        e.preventDefault();
        showNextStep();
    }
}); 

//event listener for password 
document.getElementById('password').addEventListener('keydown' , function(e) {
    if(e.key == 'Enter'){
        e.preventDefault();
        showNextStep();
    }
}); 

//event listener for email 
document.getElementById('confirmPassword').addEventListener('keydown' , function(e) {
    if(e.key == 'Enter'){
        e.preventDefault();
        showNextStep();
    }
}); 
//event listener for contact number 
document.getElementById('contact').addEventListener('keydown' , function(e) {
    if(e.key == 'Enter'){
        e.preventDefault();
        showNextStep();
    }
}); 

document.getElementById('make').addEventListener('change' , function(){
    showNextStep();
});

document.getElementById('model').addEventListener('keydown' , function(e){
    if(e.key === 'Enter'){
        e.preventDefault();
        showNextStep();
    } 
});

document.getElementById('type').addEventListener('keydown' , function(e){
    if(e.key === 'Enter'){
        e.preventDefault();
        showNextStep();
    } 
});

document.getElementById('number').addEventListener('keydown', function(e){
    if(e.key === 'Enter'){
        e.preventDefault();
        showNextStep();
    } 
});

document.getElementById('empId').addEventListener('keydown', function(e){
    if(e.key === 'Enter'){
        e.preventDefault();
        showNextStep();
    } 
});

document.getElementById('identification').addEventListener('keydown', function(e){
    if(e.key === 'Enter'){
        e.preventDefault();
        alert("Vehicle form completed");
    } 
});