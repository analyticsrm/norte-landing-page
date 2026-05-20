// Marquee + Servi
os + Processo

function Marquee({ dark = false }) {
  const items = [
    'Tr
fego pago',
    'Sites que convertem',
    'Meta Ads',
    'Google Ads',
    'Webflow',
    'Next.js',
    'Relat
rios honestos',
    'GA4 + Looker',
    'Performance',
    'Estrat
gia'
  ];
  // duplicate for infinite loop
  const loop = [...items, ...items];
  return (
    <div className={`marquee ${dark ? 'on-dark' : ''}`}>
      <div className="marquee-track">
        {loop.map((it, i) => (
          <span key={i} className={`marquee-item ${i % 2 === 1 ? 'muted' : ''}`}>
            {it}
            <span className="sep" aria-hidden="true"></span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Servicos() {
  return (
    <section className="section-pad" id="servicos">
      <div className="container">
        <div className="reveal" data-delay="0">
          <div className="section-label">
            <span className="tri" aria-hidden="true"></span>
            Servi
os
          </div>
          <h2 className="section-title">
            Duas frentes. Um time s
do entre quem atrai e quem converte.
          </h2>
          <p className="section-sub">
            Cada projeto roda com estrat
dia e site falando a mesma l
o precisa intermediar nada.
          </p>
        </div>

        <div className="services-grid">
          <article className="service-card reveal scroll-through-l" data-delay="1">
            <div className="number">01
DIA</div>
            <div className="visual">
              <div className="svc-traffic">
                <div className="bar" style={{height: '22%'}}></div>
                <div className="bar" style={{height: '38%'}}></div>
                <div className="bar" style={{height: '30%'}}></div>
                <div className="bar" style={{height: '52%'}}></div>
                <div className="bar" style={{height: '45%'}}></div>
                <div className="bar" style={{height: '68%'}}></div>
                <div className="bar" style={{height: '60%'}}></div>
                <div className="bar hl" style={{height: '82%'}}></div>
                <div className="bar hl" style={{height: '95%'}}></div>
                <div className="bar hl" style={{height: '88%'}}></div>
                <div className="bar" style={{height: '72%'}}></div>
                <div className="bar" style={{height: '64%'}}></div>
              </div>
            </div>
            <h3>Tr
fego pago</h3>
            <p className="lead">
              Campanhas no Meta, Google e TikTok desenhadas pra gerar receita, n
o vaidade. Estrutura de conta, criativos, lances e segmenta
o revisados toda semana.
            </p>
            <ul className="feats">
              <li>Estrat
gia full-funnel</li>
              <li>Criativos por hip
tese</li>
              <li>Tracking server-side</li>
              <li>Relat
rios em GA4</li>
              <li>Bid strategy</li>
              <li>Reuni
es quinzenais</li>
            </ul>
          </article>

          <article className="service-card reveal scroll-through-r" data-delay="2">
            <div className="number">02
 SITE</div>
            <div className="visual">
              <div className="svc-site">
                <div className="browser">
                  <div className="browser-bar">
                    <i></i><i></i><i></i>
                  </div>
                  <div className="browser-body">
                    <div className="row w40"></div>
                    <div className="row w90"></div>
                    <div className="row w70"></div>
                    <div className="row w50"></div>
                  </div>
                </div>
              </div>
            </div>
            <h3>Cria
o de sites</h3>
            <p className="lead">
              Site institucional e landing pages pensadas pra converter o tr
fego que a m
dia traz. Performance, copy e design no mesmo briefing.
            </p>
            <ul className="feats">
              <li>Webflow ou Next.js</li>
              <li>Copy orientada a CRO</li>
              <li>Lighthouse 95+</li>
              <li>SEO t
cnico</li>
              <li>A/B em landing pages</li>
              <li>Painel pr
prio do cliente</li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}

const PROCESS_STEPS = [
  {
    n: '01',
    t: 'Diagn
stico',
    d: 'Olhamos conta, site, m
tricas e a oferta. Voc
 recebe um relat
rio do que est
 furando, antes de qualquer proposta.',
    w: 'Semana 1'
  },
  {
    n: '02',
    t: 'Plano',
    d: 'Estrat
gia escrita: hip
amento por canal, metas por funil e o que muda no site. Tudo em uma p
gina.',
    w: 'Semana 2'
  },
  {
    n: '03',
    t: 'Execu
o',
    d: 'Campanhas no ar, ajustes no site, criativos em produ
o. Cada decis
o fica registrada no painel da conta.',
    w: 'Semanas 3-4'
  },
  {
    n: '04',
    t: 'Relat
rio',
    d: 'Reuni
o quinzenal com leitura honesta dos n
meros. O que funcionou, o que n
o funcionou e o que muda no pr
ximo ciclo.',
    w: 'Recorrente'
  }
];

function Processo() {
  return (
    <section className="section-pad dark-section" id="processo">
      <div className="container">
        <div className="reveal">
          <div className="section-label">
            <span className="tri" aria-hidden="true"></span>
            Processo
          </div>
          <h2 className="section-title">
            Como a Norte trabalha do contato
ncia.
          </h2>
          <p className="section-sub">
            Sem proposta gen
rica. Sem onboarding de dois meses. Voc
 assina e em 14 dias as primeiras campanhas est
o no ar.
          </p>
        </div>

        <div className="process-grid">
          {PROCESS_STEPS.map((s, i) => (
            <div key={s.n} className="process-step reveal scroll-through" data-delay={i + 1}>
              <div className="num">{s.n}</div>
              <h4>{s.t}</h4>
              <p>{s.d}</p>
              <div className="when">{s.w}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Marquee, Servicos, Processo, PROCESS_STEPS });
