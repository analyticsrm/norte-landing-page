// CTA final (com v
deo HLS) + Footer

const { useEffect: useEffectFinal, useRef: useRefFinal, useState: useStateFinal } = React;

function CTAFinal({ tweaks }) {
  const videoRef = useRefFinal(null);
  const [status, setStatus] = useStateFinal('');
  const [submitting, setSubmitting] = useStateFinal(false);

  // HLS playback (Safari plays m3u8 natively; other browsers need hls.js)
  useEffectFinal(() => {
    const video = videoRef.current;
    if (!video || tweaks.cinematic === 'off') return;
    const src = 'https://stream.mux.com/NcU3HlHeF7CUL86azTTzpy3Tlb00d6iF3BmCdFslMJYM.m3u8';

    const playSafely = () => {
      const p = video.play();
      if (p && p.catch) p.catch(() => {});
    };

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
      playSafely();
      return;
    }
    // Load hls.js dynamically once
    const ensureHls = () => new Promise((resolve, reject) => {
      if (window.Hls) return resolve(window.Hls);
      const s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/hls.js@1/dist/hls.min.js';
      s.onload = () => resolve(window.Hls);
      s.onerror = reject;
      document.head.appendChild(s);
    });

    let hls;
    ensureHls().then((Hls) => {
      if (!videoRef.current) return;
      if (Hls && Hls.isSupported && Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(videoRef.current);
        hls.on(Hls.Events.MANIFEST_PARSED, () => playSafely());
      } else {
        videoRef.current.src = src;
        playSafely();
      }
    }).catch(() => {});

    return () => {
      try { hls && hls.destroy(); } catch(e) {}
    };
  }, [tweaks.cinematic]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setStatus('Enviando
');
    // Fake submission
 show success after a beat
    setTimeout(() => {
      setStatus('Recebemos. Respondemos em at
til.');
      setSubmitting(false);
      e.target.reset();
    }, 900);
  };

  return (
    <section className="cta-final" id="contato">
      <div className="cta-final-video-wrap" aria-hidden="true">
        <video
          ref={videoRef}
          className="cta-final-video"
          muted
          playsInline
          autoPlay
          loop
          preload="auto"
        ></video>
        <div className="cta-final-overlay"></div>
      </div>

      <div className="container cta-final-content">
        <div className="cta-final-inner">
          <div className="reveal">
            <div className="section-label" style={{color: 'var(--color-laranja)'}}>
              <span className="tri" aria-hidden="true"></span>
              Pr
ximo passo
            </div>
            <h2>
              <SplitWords perWordDelay={80}>
                Pronto pra achar o <span className="accent">norte?</span>
              </SplitWords>
            </h2>
            <p>
              Conta da
ltima campanha, site atual, ticket m
dio. A gente devolve um diagn
stico escrito antes de qualquer proposta. Sem custo, sem cobran
ada.
            </p>
          </div>

          <form className="contact-form reveal" data-delay="1" onSubmit={onSubmit}>
            <div className="row">
              <div className="field">
                <label htmlFor="cf-name">Nome</label>
                <input id="cf-name" name="name" required placeholder="Seu nome" />
              </div>
              <div className="field">
                <label htmlFor="cf-email">E-mail</label>
                <input id="cf-email" type="email" name="email" required placeholder="voce@empresa.com" />
              </div>
            </div>
            <div className="row">
              <div className="field">
                <label htmlFor="cf-company">Empresa</label>
                <input id="cf-company" name="company" placeholder="Nome da empresa" />
              </div>
              <div className="field">
                <label htmlFor="cf-invest">Investimento mensal</label>
                <select id="cf-invest" name="invest" defaultValue="">
                  <option value="" disabled>Selecione</option>
                  <option>At
 R$ 5k</option>
                  <option>R$ 5k
 R$ 15k</option>
                  <option>R$ 15k
 R$ 50k</option>
                  <option>Acima de R$ 50k</option>
                </select>
              </div>
            </div>
            <div className="field">
              <label htmlFor="cf-msg">Conta um pouco do projeto</label>
              <textarea id="cf-msg" name="msg" rows="3" placeholder="O que est
 rodando hoje e onde d
i mais"></textarea>
            </div>
            <div className="form-status">{status}</div>
            <div className="submit">
              <button type="submit" className="btn primary" disabled={submitting}>
                {submitting ? 'Enviando
' : 'Pedir diagn
stico'}
                <span className="btn-arrow" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>
              <a
                className="wa"
                href="https://wa.me/5511999999999?text=Oi%20Norte%2C%20quero%20um%20diagn%C3%B3stico."
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M3 21l1.5-4.5a8.5 8.5 0 1 1 3 3L3 21z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
                  <path d="M9 10c.5 2 1.5 3 3.5 4.5.5.3 1 .5 1.5.3.4-.2.7-.6 1-1 .2-.3.2-.7-.1-1L14 12c-.3-.2-.7-.2-1 0l-.4.3c-.8-.4-1.4-1-1.8-1.8l.3-.4c.2-.3.2-.7 0-1L10 8c-.3-.3-.7-.3-1-.1-.4.3-.8.6-1 1-.2.5 0 1 .1 1.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="reveal">
            <img src="design-system/logo-horizontal-dark.svg" alt="Norte" style={{height: 32, marginBottom: 24}} />
            <p className="footer-tagline">
              Tr
fego pago e cria
o de sites. Um time s
do entre quem atrai e quem converte.
            </p>
          </div>
          <div className="reveal" data-delay="1">
            <h5>Servi
os</h5>
            <ul>
              <li><a href="#servicos">Tr
fego pago</a></li>
              <li><a href="#servicos">Cria
o de sites</a></li>
              <li><a href="#servicos">SEO t
cnico</a></li>
              <li><a href="#servicos">CRO / A/B</a></li>
            </ul>
          </div>
          <div className="reveal" data-delay="2">
            <h5>Empresa</h5>
            <ul>
              <li><a href="#sobre">Sobre</a></li>
              <li><a href="#processo">Processo</a></li>
              <li><a href="#cases">Cases</a></li>
              <li><a href="#depoimentos">Depoimentos</a></li>
            </ul>
          </div>
          <div className="reveal" data-delay="3">
            <h5>Contato</h5>
            <ul>
              <li><a href="mailto:contato@norte.ag">contato@norte.ag</a></li>
              <li><a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
              <li><a href="#contato">Pedir diagn
stico</a></li>
              <li><a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bigmark" aria-hidden="true"><span className="word">NORTE</span></div>
        <div className="footer-bottom">
          <div>
 2026 Norte. Todos os direitos reservados.</div>
          <div>CNPJ 00.000.000/0001-00
o Paulo, BR</div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { CTAFinal, Footer });
