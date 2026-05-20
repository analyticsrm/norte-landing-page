// Norte landing
 main app

const { useState: useAppState, useEffect: useAppEffect } = React;

function App() {
  // Subscribe to tweaks from the tweaks panel
  const [tweaks, setTweaks] = useAppState(() => window.__norteTweaks || TWEAK_DEFAULTS);
  useAppEffect(() => {
    const onTweaks = (e) => setTweaks({ ...e.detail });
    window.addEventListener('norte:tweaks', onTweaks);
    return () => window.removeEventListener('norte:tweaks', onTweaks);
  }, []);

  useReveal();

  return (
    <React.Fragment>
      <ScrollProgress />
      <Nav tweaks={tweaks} />
      <main>
        <Hero tweaks={tweaks} />
        <Marquee />
        <Servicos />
        <Processo />
        <Cases />
        <Stack />
        <Sobre />
        <Depoimentos />
        <CTAFinal tweaks={tweaks} />
      </main>
      <Footer />
      <NorteTweaks />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
