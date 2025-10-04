document.addEventListener("DOMContentLoaded", function() {
    const typedSpan = document.querySelector('.typed-text');
    const texts = [
        "future chemical engineer",
        "aspiring full-stack developer",
        "graphic designer and digital illustrator",
        "pioneer for bird conservation",
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

        const sections = document.querySelectorAll('.content-section');
        const next = document.getElementById(targetId);
        const current = document.querySelector('.content-section.active');

        sections.forEach(sec => {
            if (sec !== current && sec !== next) {
                sec.classList.remove('active', 'anim-in', 'anim-out');
            }
        });

        if (current && animate && current !== next) {
            current.classList.remove('anim-in');
            current.classList.add('anim-out');
            footer.classList.remove('anim-in');
            footer.classList.add('anim-out');

            setTimeout(() => {
                current.classList.remove('active', 'anim-out');
                footer.classList.remove('anim-out');

                if (next) {
                    next.classList.add('active', 'anim-in');
                    setTimeout(() => next.classList.remove('anim-in'), 500);
                }

                footer.classList.add('anim-in');
                setTimeout(() => footer.classList.remove('anim-in'), 500);
            }, 500);
        } else {
            if (current) current.classList.remove('active', 'anim-in', 'anim-out');
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
    
    const scrollText = document.querySelector('.centered-scroll-text');
    function revealOnScroll() {
        if (!scrollText) return;
        const rect = scrollText.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        if (rect.top < windowHeight - 100) {
            scrollText.classList.add('visible');
            scrollText.classList.remove('hidden');
            window.removeEventListener('scroll', revealOnScroll);
        }
    }
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
    });