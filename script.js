document.addEventListener('DOMContentLoaded', function () {
    (function typedEffect() {
        const typedSpan = document.querySelector('.typed-text');
        if (!typedSpan) return;
        const texts = [
            'future chemical engineer',
            'aspiring full-stack developer',
            'graphic designer and digital illustrator',
            'pioneer for bird conservation',
            'debater, creative writer, and public policy advocate'
        ];
        let textIndex = 0;
        let charIndex = 0;
        let typing = true;

        function tick() {
            const current = texts[textIndex];
            if (typing) {
                if (charIndex < current.length) {
                    charIndex++;
                    typedSpan.textContent = current.slice(0, charIndex);
                    setTimeout(tick, 90);
                } else {
                    typing = false;
                    setTimeout(tick, 1200);
                }
            } else {
                if (charIndex > 0) {
                    charIndex--;
                    typedSpan.textContent = current.slice(0, charIndex);
                    setTimeout(tick, 40);
                } else {
                    typing = true;
                    textIndex = (textIndex + 1) % texts.length;
                    setTimeout(tick, 300);
                }
            }
        }

        tick();
    })();

    const coinCounter = document.createElement('div');
    coinCounter.className = 'coin-counter';

    let coins = parseInt(localStorage.getItem('coins') || '0', 10) || 0;
    let factCoins = parseInt(localStorage.getItem('factCoins') || '0', 10) || 0;
    const FACT_COIN_CAP = 10;

    function renderCoins() {
        coinCounter.textContent = `Your coins: ${coins}`;
    }

    function saveCoins() {
        localStorage.setItem('coins', String(coins));
        localStorage.setItem('factCoins', String(factCoins));
    }

    function addCoins(n) {
        coins = (coins || 0) + n;
        saveCoins();
        renderCoins();
    }

    function addFactCoins(n) {
        const canAdd = Math.max(0, Math.min(n, FACT_COIN_CAP - factCoins));
        if (canAdd <= 0) return false;
        factCoins += canAdd;
        addCoins(canAdd);
        return true;
    }

    renderCoins();
    document.body.appendChild(coinCounter);

    (function aboutCarousel() {
        const container = document.querySelector('.about-blocks-carousel');
        if (!container) return;
        const aboutBlocks = Array.from(container.querySelectorAll('.about-block'));
        const prevBtn = document.getElementById('about-prev');
        const nextBtn = document.getElementById('about-next');
        if (!prevBtn || !nextBtn || aboutBlocks.length === 0) return;
        let current = 0;

        function showBlock(idx) {
            aboutBlocks.forEach((b, i) => { b.style.display = i === idx ? 'block' : 'none'; });
            prevBtn.disabled = idx === 0;
            nextBtn.disabled = idx === aboutBlocks.length - 1;
            prevBtn.classList.toggle('disabled', prevBtn.disabled);
            nextBtn.classList.toggle('disabled', nextBtn.disabled);
        }

        function showEndModalIfNeeded(idx) {
            if (idx !== aboutBlocks.length - 1) return;
            if (document.querySelector('.modal-overlay')) return; // already open

            const overlay = document.createElement('div');
            overlay.className = 'modal-overlay';
            overlay.style.zIndex = '2000';

            const box = document.createElement('div');
            box.className = 'modal-box';

            const msg = document.createElement('div');
            msg.className = 'modal-message';
            msg.textContent = "thanks for reading to the end! here's a coin for your efforts :D feel free to explore the rest of the site for anything you need! i recommend the projects and art gallery, spent a lot of time on that<3";

            const coinImg = document.createElement('img');
            coinImg.className = 'modal-coin';
            coinImg.src = 'images/coin.png';
            coinImg.alt = 'coin';

            const okImg = document.createElement('img');
            okImg.className = 'modal-ok-img';
            okImg.src = 'images/okay.png';
            okImg.alt = 'okay';
            okImg.setAttribute('role', 'button');
            okImg.tabIndex = 0;

            box.appendChild(msg);
            box.appendChild(coinImg);
            box.appendChild(okImg);
            overlay.appendChild(box);
            document.body.appendChild(overlay);
            document.body.style.overflow = 'hidden';

            const awarded = localStorage.getItem('endModalAwarded') === '1';
            if (!awarded) {
                addCoins(1);
                localStorage.setItem('endModalAwarded', '1');
            }

            okImg.addEventListener('click', () => {
                overlay.remove();
                document.body.style.overflow = '';
            });
            okImg.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); okImg.click(); }
            });
            setTimeout(() => { try { okImg.focus(); } catch (e) {} }, 40);
        }

        prevBtn.addEventListener('click', () => {
            if (current > 0) { current--; showBlock(current); }
        });
        nextBtn.addEventListener('click', () => {
            if (current < aboutBlocks.length - 1) { current++; showBlock(current); showEndModalIfNeeded(current); }
        });

        showBlock(current);
        showEndModalIfNeeded(current);
    })();

    (function scrollReveal() {
        const headerList = document.querySelectorAll('.header-scroll-list .extra-scroll-text');
        headerList.forEach(el => {
            if (el.style.display === '') el.style.display = 'none';
            el.classList.add('scroll-reveal-hidden');
        });

        function revealHeaderList() {
            headerList.forEach(el => {
                if (el.style.display === 'none') {
                    const rect = el.getBoundingClientRect();
                    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
                    if (rect.top < windowHeight - 60) {
                        el.style.display = 'block';
                        el.classList.add('scroll-reveal-visible');
                        el.classList.remove('scroll-reveal-hidden');
                    }
                }
            });
        }

        function revealOnScrollBlocks() {
            document.querySelectorAll('.scroll-reveal-hidden').forEach(block => {
                if (block.classList.contains('scroll-reveal-visible')) return;
                const rect = block.getBoundingClientRect();
                const windowHeight = window.innerHeight || document.documentElement.clientHeight;
                if (rect.top < windowHeight - 60) {
                    block.classList.add('scroll-reveal-visible');
                    block.classList.remove('scroll-reveal-hidden');
                }
            });
        }

        window.addEventListener('scroll', revealHeaderList);
        window.addEventListener('scroll', revealOnScrollBlocks);
        revealHeaderList();
        revealOnScrollBlocks();
    })();

    function getTimeOfDay(hour) {
        if (hour >= 5 && hour < 12) return 'morning';
        if (hour >= 12 && hour < 17) return 'afternoon';
        if (hour >= 17 && hour < 21) return 'evening';
        return 'night';
    }

    function updateTimeGreeting() {
        const el = document.getElementById('time-greeting');
        if (!el) return;
        const now = new Date();
        const weekday = now.toLocaleDateString(undefined, { weekday: 'long' }).toLowerCase();
        const hour = now.getHours();
        const tod = getTimeOfDay(hour);
        el.textContent = `hey, hope you're having a good ${weekday} ${tod}!`;
        if (window.innerWidth < 420) el.classList.add('small'); else el.classList.remove('small');
    }

    updateTimeGreeting();
    (function scheduleGreetingUpdate() {
        const now = new Date();
        const msUntilNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
        setTimeout(() => {
            updateTimeGreeting();
            setInterval(updateTimeGreeting, 60 * 1000);
        }, msUntilNextMinute);
    })();

    (function pagedollFacts() {
        const pagedollImg = document.createElement('img');
        pagedollImg.src = 'images/bird_pagedoll.png';
        pagedollImg.alt = 'pagedoll';
        pagedollImg.className = 'pagedoll';
        pagedollImg.tabIndex = 0;
        pagedollImg.setAttribute('role', 'button');
        document.body.appendChild(pagedollImg);

        const facts = [
            'Chemistry fact: Water can dissolve more substances than many other common liquids.',
            'ChemE fact: Chemical engineers design processes to convert raw materials into useful products.',
            'CS fact: The first high-level programming language was Fortran, released in 1957.',
            'Bird fact: Many bird species can see ultraviolet light, which helps them find food and mates.',
            'Chemistry fact: Carbon forms more compounds than any other element.',
            'ChemE fact: Reaction engineering balances kinetics and transport to optimize production.',
            'CS fact: Machine learning models require careful evaluation and safety testing to avoid harmful behaviour.',
            'Bird fact: Some birds, like the Arctic tern, migrate thousands of miles every year.',
            'Chemistry fact: Catalysis increases reaction rates without being consumed.',
            'CS fact: Open-source software accelerated global collaboration in computing.'
        ];

        let unseenFacts = facts.slice();

        function showFactModal() {
            if (document.querySelector('.modal-overlay')) return; // only one at a time

            if (unseenFacts.length === 0) {
                const overlay = document.createElement('div');
                overlay.className = 'modal-overlay';
                overlay.style.zIndex = '2000';
                const box = document.createElement('div');
                box.className = 'modal-box';
                const msg = document.createElement('div');
                msg.className = 'modal-message';
                msg.textContent = 'No more facts for now. Thanks for reading!';
                const okImg = document.createElement('img');
                okImg.src = 'images/okay.png';
                okImg.alt = 'okay';
                okImg.className = 'modal-ok-img';
                okImg.tabIndex = 0;
                box.appendChild(msg);
                box.appendChild(okImg);
                overlay.appendChild(box);
                document.body.appendChild(overlay);
                document.body.style.overflow = 'hidden';
                okImg.addEventListener('click', () => { overlay.remove(); document.body.style.overflow = ''; });
                okImg.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); okImg.click(); } });
                setTimeout(() => { try { okImg.focus(); } catch (e) {} }, 40);
                return;
            }

            const factIndex = Math.floor(Math.random() * unseenFacts.length);
            const fact = unseenFacts.splice(factIndex, 1)[0];

            const overlay = document.createElement('div');
            overlay.className = 'modal-overlay';
            overlay.style.zIndex = '2000';

            const box = document.createElement('div');
            box.className = 'modal-box';
            const container = document.createElement('div');
            container.style.display = 'flex';
            container.style.gap = '0.8rem';
            container.style.alignItems = 'flex-start';

            const popupImg = document.createElement('img');
            popupImg.src = pagedollImg.src;
            popupImg.alt = 'pagedoll';
            popupImg.style.width = '120px';
            popupImg.style.height = 'auto';

            const right = document.createElement('div');
            right.style.flex = '1';

            const msg = document.createElement('div');
            msg.className = 'modal-message';
            msg.textContent = fact;

            const okImg = document.createElement('img');
            okImg.className = 'modal-ok-img';
            okImg.src = 'images/okay.png';
            okImg.alt = 'okay';
            okImg.tabIndex = 0;

            const hint = document.createElement('div');
            hint.style.fontSize = '0.95rem';
            hint.style.marginTop = '0.4rem';
            hint.textContent = 'Click the image (okay) to close. Click the bird again for another fact.';

            right.appendChild(msg);
            right.appendChild(okImg);
            right.appendChild(hint);

            container.appendChild(popupImg);
            container.appendChild(right);
            box.appendChild(container);
            overlay.appendChild(box);
            document.body.appendChild(overlay);
            document.body.style.overflow = 'hidden';

            if (!addFactCoins(1)) {
                console.log('fact coin cap reached; no coin awarded for this fact');
            }

            okImg.addEventListener('click', () => { overlay.remove(); document.body.style.overflow = ''; });
            okImg.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); okImg.click(); } });
            setTimeout(() => { try { okImg.focus(); } catch (e) {} }, 40);
        }

        pagedollImg.addEventListener('click', showFactModal);
        pagedollImg.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showFactModal(); } });
    })();

});