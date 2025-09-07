document.addEventListener("DOMContentLoaded", function() {
    const typedSpan = document.querySelector('.typed-text');
    const texts = [
        "Chemical Engineer",
        "Full-Stack Developer",
        "Graphic Designer",
        "Bird Advocate"
    ];

    let textIndex = 0;
    let charIndex = 0;
    let typing = true;

    function type () {
        if (!typedSpan) return;
        if (typing) {
            if (charIndex < texts[textIndex].length) {
                typedSpan.textContent = texts[textIndex].slice(0,charIndex + 1);
                charIndex++;
                setTimeout(type,100);
            } else {
                typing = false;
                setTimeout(type,1200);
            }
        } else {
            if (charIndex > 0) {
                typedSpan.textContent = texts[textIndex].slice(0,charIndex - 1);
                charIndex--;
                setTimeout(type,50);
            } else {
                typing = true;
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(type,400);
            }
        }
    }

    type();

});

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

document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.nav-btn');
    const footer = document.querySelector('footer');

    function activate(targetId) {
        const current = document.querySelector('.content-section.active');
        if (current) {
            current.classList.remove('anim-in');
            current.classList.add('anim-out');
            footer.classList.remove('anim-in');
            footer.classList.add('anim-out');

            setTimeout(() => {
                current.classList.remove('active', 'anim-out');
                footer.classList.remove('anim-out');

                const next = document.getElementById(targetId);
                if (next) {
                    next.classList.add('active', 'anim-in');
                    setTimeout(() => next.classList.remove('anim-in'), 500);
                }

                footer.classList.add('anim-in');
                setTimeout(() => footer.classList.remove('anim-in'), 500);
            }, 500);
        } else {
            const next = document.getElementById(targetId);
            if (next) {
                next.classList.add('active', 'anim-in');
                setTimeout(() => next.classList.remove('anim-in'), 500);
            }

            footer.classList.add('anim-in');
            setTimeout(() => footer.classList.remove('anim-in'), 500);
        }
    }

    buttons.forEach(btn => {
        btn.addEventListener('click', () => activate(btn.dataset.target));
    });

    const hash = location.hash.replace('#', '');
    if (hash && document.getElementById(hash)) {
        activate(hash);
    } else {
        activate('about');
    }
});
