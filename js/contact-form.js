const now = new Date();
const hour = now.getHours();
const cemodificaminheader = document.querySelector('header p');
if (hour >= 6 && hour <= 12) {
    cemodificaminheader.textContent = "este intre 6 si 12 ";
} else if (hour > 12 && hour < 17) {
    cemodificaminheader.textContent = "este intre 12 si 17";
} else {
    cemodificaminheader.textContent = "este intre 17 si 6";
}

//alert( "Hello World!");

const form = document.querySelector('form');
form.addEventListener('submit', function(event) {
    event.preventDefault(); 
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    const feedback = document.getElementById("form-feedback");
    if (name.length < 2) {
        feedback.textContent = "numele e prea scurt";
    } 
    else if (!email.includes('@')) {
        feedback.textContent = "nu contine @";
    } 
    else if (message.length < 10) {
        feedback.textContent = "mesaju nu contine 10 caractere";
    } 
    else {
        feedback.textContent = `merge`; 
    }
});

const butondarkmode = document.getElementById('darkmode');
butondarkmode.addEventListener('click', function() {
document.body.classList.toggle('dark-mode');
if (document.body.classList.contains('dark-mode')) {
butondarkmode.innerText = '☀️ Light Mode'; 
} else{
butondarkmode.innerText = '🌙 Dark Mode';
}
});

const headers = document.querySelectorAll('main h2');
headers.forEach(function(h2) {
h2.addEventListener('click', function() {
const content = this.nextElementSibling;
if (content && content.classList.contains('section-content')) {
content.classList.toggle('hidden');
this.classList.toggle('collapsed');
}
});
});
