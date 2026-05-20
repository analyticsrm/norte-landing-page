// Cases (com contadores) + Stack + Sobre + Depoimentos

function CounterValue({ target, prefix = '', suffix = '', decimals = 0 }) {
  const ref = React.useRef(null);
  useCounter(ref, target, { prefix, suffix, decimals });
  return <span ref={ref}>{prefix}0{suffix}</span>;
}

const CASES = [
  {
    seg: 'E-commerce
 Moda',
    period: '120 dias',
    big: <><CounterValue target={1.2} decimals={1} prefix="R$ " suffix="M" /></>,
    label: 'em receita atribu
dia paga, com R$ 14k/m
s de investimento m
dio.',
    name: 'Modecasa',
    desc: 'Reestrutura
logo no Meta + Google Shopping. Foco em recompra.'
  },
  {
    seg: 'SaaS B2B
stica',
    period: '180 dias',
    big: <><CounterValue target={5.8} decimals={1} /><span className="suffix">x</span></>,
    label: 'aumento em leads qualificados por m
s, mesmo CAC inicial.',
    name: 'Rota Norte',
    desc: 'LinkedIn + Google Search + landing pages por persona. Funil de demo unificado.'
  },
  {
    seg: 'Servi
de',
    period: '90 dias',
    big: <><CounterValue target={62} /><span className="suffix">%</span></>,
    label: 'de redu
o no custo por agendamento, com 3x mais consultas/m
s.',
    name: 'Cl
nica Polaris',
    desc: 'Migra
o para campanhas locais + site novo em Webflow. Mais agendamentos, menos atrito.'
  }
];

function Cases() {
  return (
    <section className="section-pad" id="cases">
      <div className="container">
        <div className="reveal" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'end', flexWrap: 'wrap', gap: 24}}>
          <div>
            <div className="section-label">
              <span className="tri" aria-hidden="true"></span>
              Cases
            </div>
            <h2 className="section-title" style={{maxWidth: 760, marginBottom: 16}}>
              N
 fazem sentido com contexto.
            </h2>
            <p className="section-sub">
              Tr
s contas. Tr
s realidades diferentes. O que conecta
todo.
            </p>
          </div>
          <a href="#contato" className="btn secondary reveal" data-delay="2">
            Quero um diagn
stico
            <span className="btn-arrow" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </a>
        </div>

        <div className="cases-grid">
          {CASES.map((c, i) => {
            const slideClass = i === 0 ? 'scroll-through-l' : i === CASES.length - 1 ? 'scroll-through-r' : 'scroll-through';
            return (
              <article key={i} className={`case-card reveal ${slideClass}`} data-delay={i + 1}>
                <div className="meta-row">
                  <span>{c.seg}</span>
                  <span>{c.period}</span>
                </div>
                <div className="stat">{c.big}</div>
                <div className="stat-label">{c.label}</div>
                <div className="case-footer">
                  <div className="name">{c.name}</div>
                  <div className="desc">{c.desc}</div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const STACK_ITEMS = [
  { name: 'Meta Ads', cat: 'M
dia', icon: 'meta' },
  { name: 'Google Ads', cat: 'M
dia', icon: 'google' },
  { name: 'TikTok Ads', cat: 'M
dia', icon: 'tiktok' },
  { name: 'LinkedIn Ads', cat: 'M
 B2B', icon: 'linkedin' },
  { name: 'GA4', cat: 'Analytics', icon: 'ga' },
  { name: 'Looker Studio', cat: 'Dashboards', icon: 'looker' },
  { name: 'Webflow', cat: 'Sites', icon: 'webflow' },
  { name: 'Next.js', cat: 'Sites
 Dev', icon: 'next' }
];

function StackIcon({ kind }) {
  // Simple geometric placeholder marks
 consistent stroke style
  const stroke = 'currentColor';
  const sw = 1.5;
  switch (kind) {
    case 'meta':
      return <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M2 17c0-7 4-12 8-12s5 3 7 7 4 7 7 7-1-9-7-9" stroke={stroke} strokeWidth={sw} strokeLinecap="round"/>
      </svg>;
    case 'google':
      return <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="9" stroke={stroke} strokeWidth={sw}/>
        <path d="M14 14h7M14 14V5" stroke={stroke} strokeWidth={sw} strokeLinecap="round"/>
      </svg>;
    case 'tiktok':
      return <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 5v14a4 4 0 1 1-4-4M14 5c0 4 3 7 7 7" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"/>
      </svg>;
    case 'linkedin':
      return <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="4" width="20" height="20" rx="3" stroke={stroke} strokeWidth={sw}/>
        <path d="M9 12v8M9 9v.01M14 20v-5a3 3 0 0 1 6 0v5" stroke={stroke} strokeWidth={sw} strokeLinecap="round"/>
      </svg>;
    case 'ga':
      return <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="14" width="4" height="10" rx="1" stroke={stroke} strokeWidth={sw}/>
        <rect x="12" y="8" width="4" height="16" rx="1" stroke={stroke} strokeWidth={sw}/>
        <rect x="20" y="4" width="4" height="20" rx="1" stroke={stroke} strokeWidth={sw}/>
      </svg>;
    case 'looker':
      return <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="9" stroke={stroke} strokeWidth={sw}/>
        <path d="M14 5v18M5 14h18" stroke={stroke} strokeWidth={sw}/>
      </svg>;
    case 'webflow':
      return <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M3 7l4 14 5-10 5 10 4-14M3 7h22" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" strokeLinecap="round"/>
      </svg>;
    case 'next':
      return <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="9" stroke={stroke} strokeWidth={sw}/>
        <path d="M9 19V9l10 14" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"/>
      </svg>;
    default:
      return null;
  }
}

function Stack() {
  return (
    <section className="section-pad" id="stack" style={{paddingTop: 0}}>
      <div className="container">
        <div className="reveal">
          <div className="section-label">
            <span className="tri" aria-hidden="true"></span>
            Stack
          </div>
          <h2 className="section-title">
            Ferramentas que a gente domina. Resto, a gente avisa antes.
          </h2>
          <p className="section-sub">
            Stack curto. Decis
 sabe exatamente onde cada real est
 rodando.
          </p>
        </div>

        <div className="stack-grid">
          {STACK_ITEMS.map((s, i) => (
            <div key={s.name} className="stack-cell reveal scroll-through" data-delay={(i % 4) + 1}>
              <div className="icon"><StackIcon kind={s.icon} /></div>
              <div className="name">{s.name}</div>
              <div className="cat">{s.cat}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Sobre() {
  return (
    <section className="section-pad" id="sobre" style={{paddingTop: 64}}>
      <div className="container">
        <div className="about-grid">
          <div className="reveal sticky-aside">
            <div className="section-label">
              <span className="tri" aria-hidden="true"></span>
              Sobre
            </div>
            <p className="about-statement">
              <SplitWords perWordDelay={50}>
                Fazemos o que <em>uma ag
ncia de verdade</em> deveria fazer: tratar o seu neg
cio como se fosse o nosso.
              </SplitWords>
            </p>
          </div>
          <div className="about-list">
            <div className="about-list-item reveal-l" data-delay="1">
              <div className="k">01</div>
              <div className="v">
                <strong>Atendimento pr
ximo, sem intermedi
rio.</strong> Voc
 fala direto com quem opera a conta. Sem gerente de conta que s
 repassa recado.
              </div>
            </div>
            <div className="about-list-item reveal-l" data-delay="2">
              <div className="k">02</div>
              <div className="v">
                <strong>M
dia e site no mesmo time.</strong> Cada R$1 atra
do pela campanha precisa ter pra onde ir no site. Os dois rodam juntos.
              </div>
            </div>
            <div className="about-list-item reveal-l" data-delay="3">
              <div className="k">03</div>
              <div className="v">
                <strong>Relat
rios honestos.</strong> Se o m
s foi ruim, a gente fala. Se algo n
o vale o investimento, a gente avisa antes. N
o depois.
              </div>
            </div>
            <div className="about-list-item reveal-l" data-delay="4">
              <div className="k">04</div>
              <div className="v">
                <strong>Sem contrato comprido.</strong> A renova
o acontece porque o resultado pede. N
o porque a multa rescis
ria prende.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const TESTIMONIALS = [
  {
    q: 'Em 60 dias, a Norte trocou a estrutura inteira da nossa conta no Meta e o ROAS saiu de 2,1 pra 4,9. O que me marcou foi a comunica
o semanal. Sem floreio.',
    n: 'Marina Castro',
    r: 'CMO
 Modecasa',
    a: 'MC'
  },
  {
    q: 'A gente j
 tinha tentado tr
ncias antes. Foi a primeira que entendeu que B2B n
 Black Friday. Estrat
gia de conte
do pago + landing por persona mudou o jogo.',
    n: 'Eduardo Ramos',
    r: 'Founder
 Rota Norte',
    a: 'ER'
  },
  {
    q: 'O site novo paga ele mesmo em tr
s meses, considerando s
o no custo por agendamento. N
 pra pedir mais do que isso.',
    n: 'Dra. Helena Souza',
    r: 'S
nica Polaris',
    a: 'HS'
  }
];

function Depoimentos() {
  return (
    <section className="section-pad" id="depoimentos" style={{paddingTop: 0}}>
      <div className="container">
        <div className="reveal">
          <div className="section-label">
            <span className="tri" aria-hidden="true"></span>
            Depoimentos
          </div>
          <h2 className="section-title" style={{maxWidth: 760}}>
            O que os clientes contam quando ningu
m pede.
          </h2>
        </div>
        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, i) => {
            const slideClass = i === 0 ? 'scroll-through-l' : i === TESTIMONIALS.length - 1 ? 'scroll-through-r' : 'scroll-through';
            return (
              <article key={i} className={`testimonial reveal ${slideClass}`} data-delay={i + 1}>
                <div>
                  <span className="quote-mark">
</span>
                  <p className="quote">{t.q}</p>
                </div>
                <div className="person">
                  <div className="avatar">{t.a}</div>
                  <div className="person-meta">
                    <div className="name">{t.n}</div>
                    <div className="role">{t.r}</div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Cases, Stack, Sobre, Depoimentos, CounterValue });
