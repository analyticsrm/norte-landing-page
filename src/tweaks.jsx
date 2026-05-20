// Tweaks panel for Norte landing

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroVariant": "norte",
  "animations": "on",
  "cinematic": "on",
  "marqueeSpeed": 24
}/*EDITMODE-END*/;

function NorteTweaks() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Reflect tweaks to body data-* attributes for CSS hooks
  React.useEffect(() => {
    document.body.dataset.animations = t.animations;
    document.body.dataset.cinematic = t.cinematic;
    const track = document.querySelector('.marquee-track');
    if (track) track.style.animationDuration = `${t.marqueeSpeed}s`;
  }, [t]);

  // Expose tweaks state to the app via a custom event so React components re-render
  React.useEffect(() => {
    window.__norteTweaks = t;
    window.dispatchEvent(new CustomEvent('norte:tweaks', { detail: t }));
  }, [t]);

  return (
    <TweaksPanel>
      <TweakSection label="Hero" />
      <TweakRadio
        label="Headline"
        value={t.heroVariant}
        onChange={v => setTweak('heroVariant', v)}
        options={[
          { value: 'norte',    label: 'Existe um norte' },
          { value: 'bussola',  label: 'Toda campanha' },
          { value: 'rumo',     label: 'Tr
fego que sabe' }
        ]}
      />

      <TweakSection label="Anima
o" />
      <TweakRadio
        label="Reveal on scroll"
        value={t.animations}
        onChange={v => setTweak('animations', v)}
        options={[
          { value: 'on',  label: 'On' },
          { value: 'off', label: 'Off' }
        ]}
      />
      <TweakSlider
        label="Marquee speed"
        value={t.marqueeSpeed}
        onChange={v => setTweak('marqueeSpeed', v)}
        min={15} max={80} step={5}
        unit="s"
      />

      <TweakSection label="Cinem
tico" />
      <TweakRadio
        label="V
deos de fundo"
        value={t.cinematic}
        onChange={v => setTweak('cinematic', v)}
        options={[
          { value: 'on',  label: 'On' },
          { value: 'off', label: 'Off' }
        ]}
      />
    </TweaksPanel>
  );
}

Object.assign(window, { NorteTweaks, TWEAK_DEFAULTS });
