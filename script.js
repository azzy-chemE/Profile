document.addEventListener('DOMContentLoaded', function () {
    const typedSpan = document.querySelector('.typed-text');
    const texts = [
        'future chemical engineer',
        'aspiring full-stack developer',
        'graphic designer and digital illustrator',
        'pioneer for bird conservation',
        'debater, creative writer, and public policy advocate'
    ];
    let textIndex = 0, charIndex = 0, typing = true;
    function type() {
        if (!typedSpan) return;
        const current = texts[textIndex];
        if (typing) {
            if (charIndex < current.length) {
                typedSpan.textContent = current.slice(0, ++charIndex);
                setTimeout(type, 100);
            } else {
                typing = false;
                setTimeout(type, 1200);
            }
        } else {
            if (charIndex > 0) {
                typedSpan.textContent = current.slice(0, --charIndex);
                setTimeout(type, 50);
            } else {
                typing = true;
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(type, 400);
            }
        }
    }
    type();

    const coinCounter = document.createElement('div');
    coinCounter.className = 'coin-counter';
    coinCounter.style.position = 'fixed';
    coinCounter.style.top = '12px';
    coinCounter.style.right = '12px';
    coinCounter.style.zIndex = '1000';
    coinCounter.style.backgroundColor = 'rgba(0,0,0,0.65)';
    coinCounter.style.color = '#fff';
    coinCounter.style.padding = '0.25rem 0.5rem';
    coinCounter.style.borderRadius = '6px';
    coinCounter.style.fontSize = '0.95rem';
    coinCounter.style.boxShadow = '0 1px 3px rgba(0,0,0,0.3)';

    let coins = 0;
    let factCoins = 0;
    let endModalAwarded = false;

    function renderCoins() { coinCounter.textContent = `Your coins: ${coins}`; }
    function addCoins(n) { coins = (coins || 0) + n; renderCoins(); }
    function addFactCoins(n) {
        const maxFactCoins = 10;
        factCoins = factCoins || 0;
        const canAdd = Math.max(0, Math.min(n, maxFactCoins - factCoins));
        if (canAdd <= 0) return false;
        factCoins += canAdd;
        addCoins(canAdd);
        return true;
    }

    document.body.appendChild(coinCounter);
    renderCoins();

    const coinCursor = document.getElementById('coin-cursor');
    if (coinCursor) {
        coinCursor.style.display = 'block';
        document.addEventListener('mousemove', (e) => {
            coinCursor.style.left = e.clientX + 'px';
            coinCursor.style.top = e.clientY + 'px';
        });
    }

    const buttons = document.querySelectorAll('.nav-btn');
    const footer = document.querySelector('footer');
    function activate(targetId, animate = true) {
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.target === targetId));
        const sections = document.querySelectorAll('.content-section');
        const next = document.getElementById(targetId);
        const current = document.querySelector('.content-section.active');

        const aboutCarousel = document.querySelector('.about-blocks-carousel');
        const aboutNav = document.querySelector('.about-carousel-nav');
        const frontPageTexts = document.querySelectorAll('.centered-scroll-text, .extra-scroll-text');
        if (targetId === 'about') {
            if (aboutCarousel) aboutCarousel.style.display = '';
            if (aboutNav) aboutNav.style.display = '';
            frontPageTexts.forEach(el => el.style.display = '');
        } else {
            if (aboutCarousel) aboutCarousel.style.display = 'none';
            if (aboutNav) aboutNav.style.display = 'none';
            frontPageTexts.forEach(el => el.style.display = 'none');
        }

        if (current && animate && current !== next) {
            current.classList.remove('anim-in');
            current.classList.add('anim-out');
            footer.classList.remove('anim-in');
            footer.classList.add('anim-out');
            setTimeout(() => {
                current.classList.remove('active', 'anim-out');
                footer.classList.remove('anim-out');
                if (next) { next.classList.add('active', 'anim-in'); setTimeout(() => next.classList.remove('anim-in'), 500); }
                footer.classList.add('anim-in');
                setTimeout(() => footer.classList.remove('anim-in'), 500);
            }, 500);
        } else {
            if (current) current.classList.remove('active', 'anim-in', 'anim-out');
            if (next) next.classList.add('active');
        }
    }
    buttons.forEach(btn => btn.addEventListener('click', () => activate(btn.dataset.target, true)));
    const hash = location.hash.replace('#', '');
    if (hash && document.getElementById(hash)) activate(hash, false); else activate('about', false);

    const aboutBlocksContainer = document.querySelector('.about-blocks-carousel');
    if (aboutBlocksContainer) {
        const aboutBlocks = aboutBlocksContainer.querySelectorAll('.about-block');
        const prevBtn = document.getElementById('about-prev');
        const nextBtn = document.getElementById('about-next');
        let current = 0;
        function showBlock(idx) {
            aboutBlocks.forEach((block, i) => block.style.display = (i === idx) ? 'block' : 'none');
            if (prevBtn) { prevBtn.disabled = idx === 0; prevBtn.classList.toggle('disabled', prevBtn.disabled); }
            if (nextBtn) { nextBtn.disabled = idx === aboutBlocks.length - 1; nextBtn.classList.toggle('disabled', nextBtn.disabled); }
        }
        if (prevBtn) prevBtn.addEventListener('click', () => { if (current > 0) { current--; showBlock(current); showEndModalIfNeeded(current); } });
        if (nextBtn) nextBtn.addEventListener('click', () => { if (current < aboutBlocks.length - 1) { current++; showBlock(current); showEndModalIfNeeded(current); } });
        showBlock(current);

        function showEndModalIfNeeded(idx) {
            if (idx !== aboutBlocks.length - 1) return;
            if (document.querySelector('.modal-overlay')) return;
            const overlay = document.createElement('div');
            overlay.className = 'modal-overlay'; overlay.style.zIndex = '2000';
            const box = document.createElement('div'); box.className = 'modal-box';
            const msg = document.createElement('div'); msg.className = 'modal-message';
            if (!endModalAwarded) msg.textContent = "thanks for reading to the end! here's a coin for your efforts :D";
            else msg.textContent = "you already got a coin from reading to the end, silly! try clicking the bird for facts instead :)";
            box.appendChild(msg);
            if (!endModalAwarded) {
                const coinImg = document.createElement('img'); coinImg.className = 'modal-coin'; coinImg.src = 'images/coin.png'; coinImg.alt = 'coin'; box.appendChild(coinImg);
                addCoins(1); endModalAwarded = true;
            }
            const okImg = document.createElement('img'); okImg.className = 'modal-ok-img'; okImg.src = 'images/okay.png'; okImg.alt = 'okay'; okImg.setAttribute('role', 'button'); okImg.tabIndex = 0; box.appendChild(okImg);
            overlay.appendChild(box); document.body.appendChild(overlay); document.body.style.overflow = 'hidden';
            okImg.addEventListener('click', () => { overlay.remove(); document.body.style.overflow = ''; });
            okImg.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); okImg.click(); } });
            setTimeout(() => { try { okImg.focus(); } catch (e) {} }, 40);
        }
    }

    const headerList = document.querySelectorAll('.header-scroll-list .extra-scroll-text');
    headerList.forEach(el => { el.style.display = 'none'; el.classList.add('scroll-reveal-hidden'); });
    function revealHeaderList() {
        headerList.forEach(el => {
            if (el.style.display === 'none') {
                const rect = el.getBoundingClientRect();
                const windowHeight = window.innerHeight || document.documentElement.clientHeight;
                if (rect.top < windowHeight - 60) {
                    el.style.display = 'block'; el.classList.add('scroll-reveal-visible'); el.classList.remove('scroll-reveal-hidden');
                }
            }
        });
    }
    window.addEventListener('scroll', revealHeaderList); revealHeaderList();
    function revealOnScrollBlocks() {
        document.querySelectorAll('.scroll-reveal-hidden').forEach(block => {
            if (block.classList.contains('scroll-reveal-visible')) return;
            const rect = block.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            if (rect.top < windowHeight - 60) { block.classList.add('scroll-reveal-visible'); block.classList.remove('scroll-reveal-hidden'); }
        });
    }
    window.addEventListener('scroll', revealOnScrollBlocks); revealOnScrollBlocks();

    function getTimeOfDay(hour) { if (hour >= 5 && hour < 12) return 'morning'; if (hour >= 12 && hour < 17) return 'afternoon'; if (hour >= 17 && hour < 21) return 'evening'; return 'night'; }
    function updateTimeGreeting() {
        const el = document.getElementById('time-greeting'); if (!el) return; const now = new Date(); const weekday = now.toLocaleDateString(undefined, { weekday: 'long' }).toLowerCase(); const hour = now.getHours(); const tod = getTimeOfDay(hour);
        el.textContent = `hey, hope you're having a good ${weekday} ${tod}!`; if (window.innerWidth < 420) el.classList.add('small'); else el.classList.remove('small');
    }
    updateTimeGreeting(); const now = new Date(); const msUntilNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
    setTimeout(() => { updateTimeGreeting(); setInterval(updateTimeGreeting, 60 * 1000); }, msUntilNextMinute);

    const pagedollImg = document.createElement('img'); pagedollImg.src = 'images/bird_pagedoll.png'; pagedollImg.alt = 'pagedoll'; pagedollImg.className = 'pagedoll'; pagedollImg.tabIndex = 0; pagedollImg.setAttribute('role', 'button'); pagedollImg.style.width = '250px'; pagedollImg.style.height = 'auto'; pagedollImg.style.cursor = 'pointer'; document.body.appendChild(pagedollImg);
    const facts = [
        'Chemistry fact: Water can dissolve more substances than many other liquids.',
        'ChemE fact: Chemical engineers design processes to convert raw materials into useful products.',
        'CS fact: The first high-level programming language was Fortran, released in 1957.',
        'Bird fact: Many bird species can see ultraviolet light, which helps them find food and mates.',
        'Chemistry fact: Carbon forms more compounds than any other element.',
        'ChemE fact: Reaction engineering balances kinetics and transport to optimize production.',
        'CS fact: Machine learning models require careful evaluation and safety testing to avoid harmful behaviour.',
        'Bird fact: Some birds, like the Arctic tern, migrate thousands of miles every year.',
        'Chemistry fact: Catalysts speed up reactions without being consumed.',
        'CS fact: Open-source software accelerated global collaboration in computing.'
    ];
    let unseenFacts = facts.slice();
    function showFactModal() {
        if (document.querySelector('.modal-overlay')) return; // don't stack
        const overlay = document.createElement('div'); overlay.className = 'modal-overlay'; overlay.style.zIndex = '2000'; const box = document.createElement('div'); box.className = 'modal-box';
        if (unseenFacts.length === 0) {
            const msg = document.createElement('div'); msg.className = 'modal-message'; msg.textContent = "no more facts this session — try again after a refresh!"; box.appendChild(msg);
            const okImg = document.createElement('img'); okImg.className = 'modal-ok-img'; okImg.src = 'images/okay.png'; okImg.alt = 'okay'; okImg.tabIndex = 0; box.appendChild(okImg);
            overlay.appendChild(box); document.body.appendChild(overlay); document.body.style.overflow = 'hidden'; okImg.addEventListener('click', () => { overlay.remove(); document.body.style.overflow = ''; }); okImg.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); okImg.click(); } }); setTimeout(() => { try { okImg.focus(); } catch (e) {} }, 40); return;
        }
        const idx = Math.floor(Math.random() * unseenFacts.length); const fact = unseenFacts.splice(idx, 1)[0];
        const container = document.createElement('div'); container.style.display = 'flex'; container.style.flexDirection = 'row'; container.style.alignItems = 'center'; container.style.gap = '1rem';
        const popupImg = document.createElement('img'); popupImg.className = 'pagedoll-popup-img'; popupImg.src = 'images/bird_pagedoll_popup.png'; popupImg.style.width = '220px'; popupImg.style.height = 'auto'; popupImg.alt = 'pagedoll';
        const right = document.createElement('div'); right.style.flex = '1'; right.style.display = 'flex'; right.style.flexDirection = 'column'; right.style.alignItems = 'center'; right.style.justifyContent = 'center'; right.style.textAlign = 'center';
        const msg = document.createElement('div'); msg.className = 'modal-message'; msg.textContent = fact;
        const okImg = document.createElement('img'); okImg.className = 'modal-ok-img'; okImg.src = 'images/okay.png'; okImg.alt = 'okay'; okImg.tabIndex = 0; okImg.style.display = 'block'; okImg.style.margin = '0.6rem auto 0';
        const hint = document.createElement('div'); hint.style.fontSize = '0.95rem'; hint.style.marginTop = '0.4rem'; hint.textContent = 'Click OK to close. Click the bird again for another fact.';
        right.appendChild(msg); right.appendChild(okImg); right.appendChild(hint); container.appendChild(popupImg); container.appendChild(right); box.appendChild(container); overlay.appendChild(box); document.body.appendChild(overlay); document.body.style.overflow = 'hidden';
        if (!addFactCoins(1)) console.log('fact coin cap reached; no coin awarded');
        okImg.addEventListener('click', () => { overlay.remove(); document.body.style.overflow = ''; }); okImg.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); okImg.click(); } }); setTimeout(() => { try { okImg.focus(); } catch (e) {} }, 40);
    }
    pagedollImg.addEventListener('click', showFactModal); pagedollImg.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showFactModal(); } });
});
                        let coins = 0;
                        let factCoins = 0;
                        let endModalAwarded = false;

                        function renderCoins() {
                            coinCounter.textContent = `Your coins: ${coins}`;
                        }

                        function addCoins(n) {
                            coins = (coins || 0) + n;
                            renderCoins();
                        }

                        function addFactCoins(n) {
                            const maxFactCoins = 10;
                            factCoins = factCoins || 0;
                            const canAdd = Math.max(0, Math.min(n, maxFactCoins - factCoins));
                            if (canAdd <= 0) return false;
                            factCoins += canAdd;
                            addCoins(canAdd);
                            return true;
                        }

                        document.body.appendChild(coinCounter);
                        renderCoins();

                        const coinCursor = document.getElementById('coin-cursor');
                        if (coinCursor) {
                            coinCursor.style.display = 'block';
                            document.addEventListener('mousemove', (e) => {
                                coinCursor.style.left = e.clientX + 'px';
                                coinCursor.style.top = e.clientY + 'px';
                            });
                        }

                        const buttons = document.querySelectorAll('.nav-btn');
                        const footer = document.querySelector('footer');
                        function activate(targetId, animate = true) {
                            document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.target === targetId));
                            const sections = document.querySelectorAll('.content-section');
                            const next = document.getElementById(targetId);
                            const current = document.querySelector('.content-section.active');

                            const aboutCarousel = document.querySelector('.about-blocks-carousel');
                            const aboutNav = document.querySelector('.about-carousel-nav');
                            const frontPageTexts = document.querySelectorAll('.centered-scroll-text, .extra-scroll-text');
                            if (targetId === 'about') {
                                if (aboutCarousel) aboutCarousel.style.display = '';
                                if (aboutNav) aboutNav.style.display = '';
                                frontPageTexts.forEach(el => el.style.display = '');
                            } else {
                                if (aboutCarousel) aboutCarousel.style.display = 'none';
                                if (aboutNav) aboutNav.style.display = 'none';
                                frontPageTexts.forEach(el => el.style.display = 'none');
                            }

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
                        buttons.forEach(btn => btn.addEventListener('click', () => activate(btn.dataset.target, true)));
                        const hash = location.hash.replace('#', '');
                        if (hash && document.getElementById(hash)) activate(hash, false); else activate('about', false);

                        const aboutBlocksContainer = document.querySelector('.about-blocks-carousel');
                        if (aboutBlocksContainer) {
                            const aboutBlocks = aboutBlocksContainer.querySelectorAll('.about-block');
                            const prevBtn = document.getElementById('about-prev');
                            const nextBtn = document.getElementById('about-next');
                            let current = 0;
                            function showBlock(idx) {
                                aboutBlocks.forEach((block, i) => block.style.display = (i === idx) ? 'block' : 'none');
                                if (prevBtn) { prevBtn.disabled = idx === 0; prevBtn.classList.toggle('disabled', prevBtn.disabled); }
                                if (nextBtn) { nextBtn.disabled = idx === aboutBlocks.length - 1; nextBtn.classList.toggle('disabled', nextBtn.disabled); }
                            }

                            if (prevBtn) prevBtn.addEventListener('click', () => { if (current > 0) { current--; showBlock(current); showEndModalIfNeeded(current); } });
                            if (nextBtn) nextBtn.addEventListener('click', () => { if (current < aboutBlocks.length - 1) { current++; showBlock(current); showEndModalIfNeeded(current); } });
                            showBlock(current);

                            function showEndModalIfNeeded(idx) {
                                if (idx !== aboutBlocks.length - 1) return;
                                if (document.querySelector('.modal-overlay')) return;
                                const overlay = document.createElement('div');
                                overlay.className = 'modal-overlay';
                                overlay.style.zIndex = '2000';

                                const box = document.createElement('div');
                                box.className = 'modal-box';

                                const msg = document.createElement('div');
                                msg.className = 'modal-message';
                                if (!endModalAwarded) {
                                    msg.textContent = "thanks for reading to the end! here's a coin for your efforts :D";
                                } else {
                                    msg.textContent = "you already got a coin from reading to the end, silly! try clicking the bird for facts instead :)";
                                }

                                box.appendChild(msg);

                                if (!endModalAwarded) {
                                    const coinImg = document.createElement('img');
                                    coinImg.className = 'modal-coin';
                                    coinImg.src = 'images/coin.png';
                                    coinImg.alt = 'coin';
                                    box.appendChild(coinImg);
                                    addCoins(1);
                                    endModalAwarded = true;
                                }

                                const okImg = document.createElement('img');
                                okImg.className = 'modal-ok-img';
                                okImg.src = 'images/okay.png';
                                okImg.alt = 'okay';
                                okImg.setAttribute('role', 'button');
                                okImg.tabIndex = 0;
                                box.appendChild(okImg);

                                overlay.appendChild(box);
                                document.body.appendChild(overlay);
                                document.body.style.overflow = 'hidden';

                                okImg.addEventListener('click', () => { overlay.remove(); document.body.style.overflow = ''; });
                                okImg.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); okImg.click(); } });
                                setTimeout(() => { try { okImg.focus(); } catch (e) {} }, 40);
                            }
                        }

                        const headerList = document.querySelectorAll('.header-scroll-list .extra-scroll-text');
                        headerList.forEach(el => { el.style.display = 'none'; el.classList.add('scroll-reveal-hidden'); });
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
                        window.addEventListener('scroll', revealHeaderList);
                        revealHeaderList();

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
                        window.addEventListener('scroll', revealOnScrollBlocks);
                        revealOnScrollBlocks();

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
                        const now = new Date();
                        const msUntilNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
                        setTimeout(() => { updateTimeGreeting(); setInterval(updateTimeGreeting, 60 * 1000); }, msUntilNextMinute);

                        const pagedollImg = document.createElement('img');
                        pagedollImg.src = 'images/bird_pagedoll.png';
                        pagedollImg.alt = 'pagedoll';
                        pagedollImg.className = 'pagedoll';
                        pagedollImg.tabIndex = 0;
                        pagedollImg.setAttribute('role', 'button');
                        pagedollImg.style.width = '250px';
                        pagedollImg.style.height = 'auto';
                        pagedollImg.style.cursor = 'pointer';
                        document.body.appendChild(pagedollImg);

                        const facts = [
                            // placeholders, I will edit these to be good later :3
                            'Chemistry fact: Water can dissolve more substances than many other liquids.',
                            'ChemE fact: Chemical engineers design processes to convert raw materials into useful products.',
                            'CS fact: The first high-level programming language was Fortran, released in 1957.',
                            'Bird fact: Many bird species can see ultraviolet light, which helps them find food and mates.',
                            'Chemistry fact: Carbon forms more compounds than any other element.',
                            'ChemE fact: Reaction engineering balances kinetics and transport to optimize production.',
                            'CS fact: Machine learning models require careful evaluation and safety testing to avoid harmful behaviour.',
                            'Bird fact: Some birds, like the Arctic tern, migrate thousands of miles every year.',
                            'Chemistry fact: Catalysts speed up reactions without being consumed.',
                            'CS fact: Open-source software accelerated global collaboration in computing.'
                        ];

                        let unseenFacts = facts.slice();

                        function showFactModal() {
                            if (document.querySelector('.modal-overlay')) return; 

                            const overlay = document.createElement('div');
                            overlay.className = 'modal-overlay';
                            overlay.style.zIndex = '2000';

                            const box = document.createElement('div');
                            box.className = 'modal-box';

                            if (unseenFacts.length === 0) {
                                const msg = document.createElement('div');
                                msg.className = 'modal-message';
                                msg.textContent = "no more facts this session — try again after a refresh!";
                                box.appendChild(msg);
                                const okImg = document.createElement('img');
                                okImg.className = 'modal-ok-img';
                                okImg.src = 'images/okay.png';
                                okImg.alt = 'okay';
                                okImg.tabIndex = 0;
                                box.appendChild(okImg);
                                overlay.appendChild(box);
                                document.body.appendChild(overlay);
                                document.body.style.overflow = 'hidden';
                                okImg.addEventListener('click', () => { overlay.remove(); document.body.style.overflow = ''; });
                                okImg.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); okImg.click(); } });
                                setTimeout(() => { try { okImg.focus(); } catch (e) {} }, 40);
                                return;
                            }

                            const idx = Math.floor(Math.random() * unseenFacts.length);
                            const fact = unseenFacts.splice(idx, 1)[0];

                            const container = document.createElement('div');
                            container.style.display = 'flex';
                            container.style.flexDirection = 'row';
                            container.style.alignItems = 'center';
                            container.style.gap = '1rem';

                            const popupImg = document.createElement('img');
                            popupImg.className = 'pagedoll-popup-img';
                            popupImg.src = 'images/bird_pagedoll_popup.png';
                            popupImg.style.width = '220px';
                            popupImg.style.height = 'auto';
                            popupImg.alt = 'pagedoll';

                            const right = document.createElement('div');
                            right.style.flex = '1';
                            right.style.display = 'flex';
                            right.style.flexDirection = 'column';
                            right.style.alignItems = 'center';
                            right.style.justifyContent = 'center';
                            right.style.textAlign = 'center';

                            const msg = document.createElement('div');
                            msg.className = 'modal-message';
                            msg.textContent = fact;

                            const okImg = document.createElement('img');
                            okImg.className = 'modal-ok-img';
                            okImg.src = 'images/okay.png';
                            okImg.alt = 'okay';
                            okImg.tabIndex = 0;
                            okImg.style.display = 'block';
                            okImg.style.margin = '0.6rem auto 0';

                            const hint = document.createElement('div');
                            hint.style.fontSize = '0.95rem';
                            hint.style.marginTop = '0.4rem';
                            hint.textContent = 'Click OK to close. Click the bird again for another fact.';

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
                                console.log('fact coin cap reached; no coin awarded');
                            }

                            okImg.addEventListener('click', () => { overlay.remove(); document.body.style.overflow = ''; });
                            okImg.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); okImg.click(); } });
                            setTimeout(() => { try { okImg.focus(); } catch (e) {} }, 40);
                        }

                        pagedollImg.addEventListener('click', showFactModal);
                        pagedollImg.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showFactModal(); } });
                    