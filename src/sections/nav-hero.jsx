// Nav + Hero
const { useEffect: useEffectHero, useRef: useRefHero, useState: useStateHero } = React;

function Nav({ tweaks }) {
  const scrolled = useScrolled(24);
  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <a href="#top" className="nav-logo" aria-label="Norte">
          <img src="design-system/logo-horizontal-light.svg" alt="Norte" />
        </a>
        <nav className="nav-links">
          <a href="#servicos" className="active">Servi
os</a>
          <a href="#processo">Processo</a>
          <a href="#cases">Cases</a>
          <a href="#sobre">Sobre</a>
          <a href="#stack">Stack</a>
        </nav>
        <a href="#contato" className="nav-cta">
          Falar com a Norte
        </a>
      </div>
    </header>
  );
}

const HERO_VARIANTS = {
  norte: {
    pre: 'Existe um',
    accent: 'norte.',
    post: ' A gente leva voc
 ele.',
    desc: 'Tr
fego pago e cria
o de sites no mesmo time. Cada real investido tem um destino claro.'
  },
  bussola: {
    pre: 'Toda campanha precisa de um',
    accent: 'norte.',
    post: '',
    desc: 'M
dia paga que vende. Sites que convertem. No mesmo time, sem perda de alinhamento.'
  },
  rumo: {
    pre: 'Tr
fego que sabe',
    accent: 'pra onde',
    post: ' vai.',
    desc: 'Voc
 acessa os dados. A gente explica o que eles significam. Menos promessa, mais relat
rio.'
  }
};

function Hero({ tweaks }) {
  const videoARef = useRefHero(null);
  const videoBRef = useRefHero(null);
  const variant = HERO_VARIANTS[tweaks.heroVariant] || HERO_VARIANTS.norte;

  // Seamless loop with TWO video elements crossfading.
  // While A plays, B is preloaded at t=0. Near A's end, B starts and
  // crossfades in over CROSSFADE seconds; A fades out and resets behind
  // the cover of B. They swap roles continuously, so the page never sees
  // a "between loops" frame.
  useEffectHero(() => {
    const a = videoARef.current;
    const b = videoBRef.current;
    if (!a || !b || tweaks.cinematic === 'off') return;

    const CROSSFADE = 0.6; // seconds
    const INTRO_FADE = 0.5;

    let rafId;
    let started = false;
    // role.front = video currently visible & playing; role.back = standby
    let front = a, back = b;

    const playSafely = (v) => {
      const p = v.play();
      if (p && p.catch) p.catch(() => {});
    };

    const swapRoles = () => {
      const tmp = front;
      front = back;
      back = tmp;
    };

    const tick = () => {
      const dur = front.duration;
      const t = front.currentTime;
      if (Number.isFinite(dur) && dur > 0) {
        // Intro fade-in for the very first play only
        if (!started) {
          if (t < INTRO_FADE) {
            front.style.opacity = Math.max(0, t / INTRO_FADE).toFixed(3);
          } else {
            front.style.opacity = '1';
            started = true;
          }
        }

        // Near the end of front: kick back into motion and crossfade
        if (dur - t <= CROSSFADE && back.paused) {
          back.currentTime = 0;
          playSafely(back);
        }
        if (dur - t <= CROSSFADE) {
          const k = Math.max(0, (dur - t) / CROSSFADE); // 1 -> 0
          front.style.opacity = k.toFixed(3);
          back.style.opacity  = (1 - k).toFixed(3);
        } else if (started) {
          front.style.opacity = '1';
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    const onFrontEnded = () => {
      // front finished its turn
 hide & reset it, promote back to front
      front.classList.remove('is-active');
      front.style.opacity = '0';
      try { front.pause(); front.currentTime = 0; } catch(e) {}
      swapRoles();
      front.classList.add('is-active');
      // ensure front is still playing (it should be, started during crossfade)
      if (front.paused) playSafely(front);
    };

    // Initial setup
    [a, b].forEach(v => { v.muted = true; v.playsInline = true; v.style.opacity = '0'; });
    a.classList.add('is-active');
    a.addEventListener('ended', () => { if (front === a) onFrontEnded(); });
    b.addEventListener('ended', () => { if (front === b) onFrontEnded(); });
    playSafely(a);
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      try { a.pause(); b.pause(); } catch(e) {}
    };
  }, [tweaks.cinematic]);

  // Subtle parallax on the hero video as the user scrolls.
  useEffectHero(() => {
    if (tweaks.cinematic === 'off') return;
    const wrap = document.querySelector('.hero-video-wrap');
    if (!wrap) return;
    let raf = 0;
    const update = () => {
      const y = window.scrollY;
      const max = window.innerHeight;
      const t = Math.min(1, Math.max(0, y / max));
      // gentle push down and zoom for depth
      wrap.style.transform = `translateY(${(t * 8).toFixed(2)}%) scale(${(1 + t * 0.06).toFixed(3)})`;
      raf = 0;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
      wrap.style.transform = '';
    };
  }, [tweaks.cinematic]);

  return (
    <section className="hero" id="top">
      <div className="hero-video-wrap" aria-hidden="true">
        <video
          ref={videoARef}
          className="hero-video"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260306_074215_04640ca7-042c-45d6-bb56-58b1e8a42489.mp4"
          muted
          playsInline
          autoPlay
          preload="auto"
        ></video>
        <video
          ref={videoBRef}
          className="hero-video"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260306_074215_04640ca7-042c-45d6-bb56-58b1e8a42489.mp4"
          muted
          playsInline
          preload="auto"
        ></video>
        <div className="hero-video-overlay"></div>
        <div className="hero-fade-bottom" aria-hidden="true"></div>
      </div>

      <div className="container hero-content">
        <h1 className="hero-headline">
          <SplitWords perWordDelay={70} baseDelay={200}>
            {variant.pre}{' '}
            <span className="accent">
              {variant.accent}
            </span>
            {variant.post}
          </SplitWords>
        </h1>

        <p className="hero-desc fade-rise-delay-2">
          {variant.desc}
        </p>

        <div className="hero-actions fade-rise-delay-3">
          <a href="#contato" className="btn primary">
            Falar com a Norte
            <span className="btn-arrow" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </a>
          <a href="#processo" className="btn secondary">
            Ver como trabalhamos
          </a>
        </div>

        <div className="hero-meta fade-rise-delay-4">
          <div className="hero-meta-item">
            <div className="v">42</div>
            <div className="l">contas ativas</div>
          </div>
          <div className="hero-meta-item">
            <div className="v">R$ 9,4M</div>
            <div className="l">em m
dia gerida / ano</div>
          </div>
          <div className="hero-meta-item">
            <div className="v">5,8x</div>
            <div className="l">ROAS m
 e-commerce</div>
          </div>
        </div>
      </div>

      <div className="scroll-cue" aria-hidden="true">role para baixo</div>
    </section>
  );
}

Object.assign(window, { Nav, Hero, HERO_VARIANTS });
