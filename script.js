
document.addEventListener('DOMContentLoaded', function() {
const buttons = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.content-section');


function activate(targetId) {
buttons.forEach(btn => btn.classList.toggle('active', btn.dataset.target === targetId));
sections.forEach(sec => sec.classList.toggle('active', sec.id === targetId));

history.replaceState(null, '', `#${targetId}`);
}


buttons.forEach(btn => {
btn.addEventListener('click', () => activate(btn.dataset.target));
});


const hash = location.hash.replace('#','');
if (hash && document.getElementById(hash)) {
activate(hash);
} else {
activate('about');
}
});