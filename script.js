document.addEventListener("DOMContentLoaded", function() {
    const typedSpan = document.querySelector('.typed-text');
    const texts = [
        "future chemical engineer",
        "aspiring full-stack developer",
        "graphic designer and digital illustrator",
        "mom of six birds standing proud for bird conservation",
        "debater, creative writer, and public policy advocate"
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
    const footer = document.querySelector('footer');

    function activate(targetId, animate = true) {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.target === targetId);
        });

        const current = document.querySelector('.content-section.active');
        if (current && animate) {
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
            if (current) current.classList.remove('active');
            const next = document.getElementById(targetId);
            if (next) next.classList.add('active');
        }
    }

    buttons.forEach(btn => {
        btn.addEventListener('click', () => activate(btn.dataset.target, true));
    });

    const hash = location.hash.replace('#', '');
    if (hash && document.getElementById(hash)) {
        activate(hash, false);
    } else {
        activate('about', false);
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        aboutSection.classList.add('anim-in');
        setTimeout(() => {
            aboutSection.classList.remove('anim-in');
        }, 500);
        }
    });