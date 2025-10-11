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

    document.addEventListener('DOMContentLoaded', () => {
      /* ------------------ typed text ------------------ */
      const typedSpan = document.querySelector('.typed-text');
      const texts = [
        'future chemical engineer',
        'aspiring full-stack developer',
        'graphic designer and digital illustrator',
        'pioneer for bird conservation',
        'debater, creative writer, and public policy advocate'
      ];
      let textIndex = 0, charIndex = 0, typing = true;
      function typeLoop() {
        if (!typedSpan) return;
        const current = texts[textIndex];
        if (typing) {
          if (charIndex < current.length) {
            typedSpan.textContent = current.slice(0, ++charIndex);
            setTimeout(typeLoop, 100);
          } else { typing = false; setTimeout(typeLoop, 1200); }
        } else {
          if (charIndex > 0) { typedSpan.textContent = current.slice(0, --charIndex); setTimeout(typeLoop, 50); }
          else { typing = true; textIndex = (textIndex + 1) % texts.length; setTimeout(typeLoop, 400); }
        }
      }
      typeLoop();

      /* ------------------ coin counter (session-only) ------------------ */
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

      let totalCoins = 0; // session-only
      let factCoins = 0; // cap at 10 per session
      let endAwarded = false; // award end-of-about once per session

      function renderCoins() { coinCounter.textContent = `Your coins: ${totalCoins}`; }
      function addCoins(n) { totalCoins += n; renderCoins(); }
      function addFactCoins(n) { const cap = 10; const canAdd = Math.max(0, Math.min(n, cap - factCoins)); if (canAdd <= 0) return false; factCoins += canAdd; addCoins(canAdd); return true; }
      document.body.appendChild(coinCounter); renderCoins();

      /* ------------------ coin cursor ------------------ */
      const coinCursor = document.getElementById('coin-cursor');
      if (coinCursor) {
        coinCursor.style.display = 'block'; coinCursor.style.width = '48px'; coinCursor.style.height = '48px'; coinCursor.style.pointerEvents = 'none'; coinCursor.style.position = 'fixed'; coinCursor.style.zIndex = '100001';
        document.addEventListener('mousemove', e => { coinCursor.style.left = e.clientX + 'px'; coinCursor.style.top = e.clientY + 'px'; });
      }

      /* ------------------ navigation ------------------ */
      const navBtns = document.querySelectorAll('.nav-btn');
      const sections = document.querySelectorAll('.content-section');
      const footer = document.querySelector('footer');
      function activate(id, animate = true) {
        navBtns.forEach(b => b.classList.toggle('active', b.dataset.target === id));
        const next = document.getElementById(id);
        const current = document.querySelector('.content-section.active');
        const aboutCarousel = document.querySelector('.about-blocks-carousel');
        const aboutNav = document.querySelector('.about-carousel-nav');
        const frontPageTexts = document.querySelectorAll('.centered-scroll-text, .extra-scroll-text');
        if (id === 'about') { if (aboutCarousel) aboutCarousel.style.display = ''; if (aboutNav) aboutNav.style.display = ''; frontPageTexts.forEach(e => e.style.display = ''); }
        else { if (aboutCarousel) aboutCarousel.style.display = 'none'; if (aboutNav) aboutNav.style.display = 'none'; frontPageTexts.forEach(e => e.style.display = 'none'); }
        sections.forEach(s => { if (s !== current && s !== next) s.classList.remove('active', 'anim-in', 'anim-out'); });
        if (current && animate && current !== next) { current.classList.remove('anim-in'); current.classList.add('anim-out'); footer.classList.remove('anim-in'); footer.classList.add('anim-out'); setTimeout(() => { current.classList.remove('active', 'anim-out'); footer.classList.remove('anim-out'); if (next) { next.classList.add('active', 'anim-in'); setTimeout(() => next.classList.remove('anim-in'), 500); } footer.classList.add('anim-in'); setTimeout(() => footer.classList.remove('anim-in'), 500); }, 500); }
        else { if (current) current.classList.remove('active', 'anim-in', 'anim-out'); if (next) next.classList.add('active'); }
      }
      navBtns.forEach(b => b.addEventListener('click', () => activate(b.dataset.target, true)));
      const initialHash = location.hash.replace('#', ''); if (initialHash && document.getElementById(initialHash)) activate(initialHash, false); else if (document.getElementById('about')) activate('about', false);

      /* ------------------ reveal helpers ------------------ */
      function revealOnce() { document.querySelectorAll('.scroll-reveal-hidden').forEach(el => { if (el.classList.contains('scroll-reveal-visible')) return; const rect = el.getBoundingClientRect(); const wh = window.innerHeight || document.documentElement.clientHeight; if (rect.top < wh - 60) { el.classList.add('scroll-reveal-visible'); el.classList.remove('scroll-reveal-hidden'); } }); }
      window.addEventListener('scroll', revealOnce);
      const headerList = document.querySelectorAll('.header-scroll-list .extra-scroll-text'); headerList.forEach(el => { el.style.display = 'none'; el.classList.add('scroll-reveal-hidden'); });
      function revealHeaderList() { headerList.forEach(el => { if (el.style.display === 'none') { const rect = el.getBoundingClientRect(); const wh = window.innerHeight || document.documentElement.clientHeight; if (rect.top < wh - 60) { el.style.display = 'block'; el.classList.add('scroll-reveal-visible'); el.classList.remove('scroll-reveal-hidden'); } } }); }
      window.addEventListener('scroll', revealHeaderList);
      revealOnce(); revealHeaderList();

      /* ------------------ time greeting ------------------ */
      function getTimeOfDay(h) { if (h>=5 && h<12) return 'morning'; if (h>=12 && h<17) return 'afternoon'; if (h>=17 && h<21) return 'evening'; return 'night'; }
      function updateTimeGreeting() { const el = document.getElementById('time-greeting'); if (!el) return; const now = new Date(); const weekday = now.toLocaleDateString(undefined, { weekday: 'long' }).toLowerCase(); const tod = getTimeOfDay(now.getHours()); el.textContent = `hey, hope you're having a good ${weekday} ${tod}!`; if (window.innerWidth < 420) el.classList.add('small'); else el.classList.remove('small'); }
      updateTimeGreeting(); const _now = new Date(); const msToNext = (60 - _now.getSeconds())*1000 - _now.getMilliseconds(); setTimeout(()=>{ updateTimeGreeting(); setInterval(updateTimeGreeting, 60*1000); }, msToNext);

      /* ------------------ modal helpers ------------------ */
      function createOverlay() { const o = document.createElement('div'); o.className = 'modal-overlay'; o.style.zIndex = '2000'; return o; }
      function createBox() { const b = document.createElement('div'); b.className = 'modal-box'; return b; }

      /* ------------------ about carousel + end modal ------------------ */
      const aboutCarousel = document.querySelector('.about-blocks-carousel');
      if (aboutCarousel) {
        const blocks = aboutCarousel.querySelectorAll('.about-block'); const prevBtn = document.getElementById('about-prev'); const nextBtn = document.getElementById('about-next'); let idx = 0;
        function show(i) { blocks.forEach((b,j)=> b.style.display = (i===j? 'block':'none')); if (prevBtn) { prevBtn.disabled = (i===0); prevBtn.classList.toggle('disabled', prevBtn.disabled); } if (nextBtn) { nextBtn.disabled = (i===blocks.length-1); nextBtn.classList.toggle('disabled', nextBtn.disabled); } }
        if (prevBtn) prevBtn.addEventListener('click', ()=>{ if (idx>0) { idx--; show(idx); if (idx === blocks.length-1) showEndModalIfNeeded(); } });
        if (nextBtn) nextBtn.addEventListener('click', ()=>{ if (idx<blocks.length-1) { idx++; show(idx); if (idx === blocks.length-1) showEndModalIfNeeded(); } });
        show(idx);
        function showEndModalIfNeeded(i) {
          if (i !== undefined && i !== blocks.length - 1) return; if (document.querySelector('.modal-overlay')) return; const overlay = createOverlay(); const box = createBox(); const msg = document.createElement('div'); msg.className = 'modal-message';
          if (!endAwarded) {
            msg.textContent = "thanks for reading to the end! here's a coin for your efforts :D"; const coinImg = document.createElement('img'); coinImg.className = 'modal-coin'; coinImg.src = 'images/coin.png'; coinImg.alt = 'coin'; const ok = document.createElement('img'); ok.className = 'modal-ok-img'; ok.src = 'images/okay.png'; ok.alt = 'okay'; ok.tabIndex = 0; ok.setAttribute('role','button'); box.appendChild(msg); box.appendChild(coinImg); box.appendChild(ok); overlay.appendChild(box); document.body.appendChild(overlay); document.body.style.overflow = 'hidden'; addCoins(1); endAwarded = true;
            const close = ()=>{ overlay.remove(); document.body.style.overflow = ''; ok.removeEventListener('click', close); ok.removeEventListener('keydown', onKey); };
            const onKey = (e)=>{ if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); close(); } };
            ok.addEventListener('click', close); ok.addEventListener('keydown', onKey); setTimeout(()=>{ try{ ok.focus(); }catch(e){} },40);
          } else {
            msg.textContent = "You already got a coin from reading to the end, silly! Try clicking the bird for facts instead!"; const ok = document.createElement('img'); ok.className = 'modal-ok-img'; ok.src = 'images/okay.png'; ok.alt = 'okay'; ok.tabIndex = 0; ok.setAttribute('role','button'); box.appendChild(msg); box.appendChild(ok); overlay.appendChild(box); document.body.appendChild(overlay); document.body.style.overflow = 'hidden';
            const close = ()=>{ overlay.remove(); document.body.style.overflow = ''; ok.removeEventListener('click', close); ok.removeEventListener('keydown', onKey); };
            const onKey = (e)=>{ if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); close(); } };
            ok.addEventListener('click', close); ok.addEventListener('keydown', onKey); setTimeout(()=>{ try{ ok.focus(); }catch(e){} },40);
          }
        }
        window.showEndModalIfNeeded = showEndModalIfNeeded;
      }

      /* ------------------ pagedoll + facts ------------------ */
      const pagedoll = document.createElement('img'); pagedoll.src = 'images/bird_pagedoll.png'; pagedoll.alt = 'pagedoll'; pagedoll.className = 'pagedoll'; pagedoll.tabIndex = 0; pagedoll.setAttribute('role','button'); pagedoll.style.width = '250px'; pagedoll.style.background = 'transparent'; pagedoll.style.boxShadow = 'none'; document.body.appendChild(pagedoll);
      const facts = [
        'Chemistry fact: Water can dissolve more substances than any other liquid.',
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
      let unseen = facts.slice();
      function showFactModal() {
        if (document.querySelector('.modal-overlay')) return;
        if (unseen.length === 0) { const overlay = createOverlay(); const box = createBox(); const msg = document.createElement('div'); msg.className = 'modal-message'; msg.textContent = "no more facts this session — try again after a refresh!"; const ok = document.createElement('img'); ok.className = 'modal-ok-img'; ok.src = 'images/okay.png'; ok.alt = 'okay'; ok.tabIndex = 0; box.appendChild(msg); box.appendChild(ok); overlay.appendChild(box); document.body.appendChild(overlay); document.body.style.overflow = 'hidden'; const close = ()=>{ overlay.remove(); document.body.style.overflow = ''; ok.removeEventListener('click', close); ok.removeEventListener('keydown', onKey); }; const onKey = (e)=>{ if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); close(); } }; ok.addEventListener('click', close); ok.addEventListener('keydown', onKey); setTimeout(()=>{ try{ ok.focus(); }catch(e){} },40); return; }
        const i = Math.floor(Math.random() * unseen.length); const fact = unseen.splice(i, 1)[0]; const overlay = createOverlay(); const box = createBox(); const container = document.createElement('div'); container.className = 'pagedoll-modal-content'; const popupImg = document.createElement('img'); popupImg.className = 'pagedoll-popup-img'; popupImg.src = 'images/bird_pagedoll_popup.png'; popupImg.alt = 'pagedoll'; const right = document.createElement('div'); right.style.flex = '1'; right.style.display = 'flex'; right.style.flexDirection = 'column'; right.style.alignItems = 'center'; right.style.textAlign = 'center'; const msg = document.createElement('div'); msg.className = 'modal-message'; msg.textContent = fact; const ok = document.createElement('img'); ok.className = 'modal-ok-img'; ok.src = 'images/okay.png'; ok.tabIndex = 0; ok.style.display = 'block'; ok.style.margin = '0.6rem auto 0'; const hint = document.createElement('div'); hint.style.fontSize = '0.95rem'; hint.style.marginTop = '0.4rem'; hint.textContent = 'Click OK to close. Click the bird again for another fact.'; right.appendChild(msg); right.appendChild(ok); right.appendChild(hint); container.appendChild(popupImg); container.appendChild(right); box.appendChild(container); overlay.appendChild(box); document.body.appendChild(overlay); document.body.style.overflow = 'hidden'; if (!addFactCoins(1)) { console.log('fact coin cap reached; no coin awarded'); } const close = ()=>{ overlay.remove(); document.body.style.overflow = ''; ok.removeEventListener('click', close); ok.removeEventListener('keydown', onKey); }; const onKey = (e)=>{ if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); close(); } }; ok.addEventListener('click', close); ok.addEventListener('keydown', onKey); setTimeout(()=>{ try{ ok.focus(); }catch(e){} },40);
      }
      pagedoll.addEventListener('click', showFactModal); pagedoll.addEventListener('keydown', e=>{ if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showFactModal(); } });

      /* ------------------ final housekeeping ------------------ */
      document.querySelectorAll('.header-scroll-list .extra-scroll-text').forEach(el => { el.style.display = 'none'; el.classList.add('scroll-reveal-hidden'); });
      revealOnce(); revealHeaderList();
    });
});