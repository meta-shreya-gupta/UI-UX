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