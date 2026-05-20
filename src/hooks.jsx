// Shared hooks for Norte landing page

const { useState, useEffect, useRef, useCallback } = React;

// Intersection-observer based reveal hook.
// Attach refs via data-reveal attribute; the observer toggles .is-visible.
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-l, .reveal-r, .reveal-zoom, .reveal-up');
    if (!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('is-visible'));
      return;
    }
    // Toggle .is-visible based on intersection so animations re-trigger
    // every time the element enters the viewport
 scrolling up OR down.
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
        } else {
          e.target.classList.remove('is-visible');
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  });
}

// Animate a number from 0 to target when the el enters viewport
function useCounter(ref, target, { duration = 1600, suffix = '', prefix = '', decimals = 0 } = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let started = false;
    const formatNum = (n) => {
      const fixed = decimals > 0 ? n.toFixed(decimals) : Math.round(n).toString();
      // Brazilian formatting: thousands sep with dot, decimal with comma
      const [intPart, decPart] = fixed.split('.');
      const withSep = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      return decPart ? `${withSep},${decPart}` : withSep;
    };
    const run = () => {
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        // ease-out cubic
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = prefix + formatNum(target * eased) + suffix;
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !started) {
          started = true;
          run();
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    io.observe(el);
    el.textContent = prefix + '0' + suffix;
    return () => io.disconnect();
  }, [target, duration, suffix, prefix, decimals]);
}

// Scroll position state (for nav border)
function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return scrolled;
}

// Scroll progress bar
 fixed orange bar at top of page
function ScrollProgress() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
      el.style.width = `${pct}%`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div ref={ref} className="scroll-progress" aria-hidden="true"></div>;
}

// Parallax: translate Y of element based on scroll position (relative to its own offsetTop)
function useParallax(ref, factor = 0.15) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const offset = rect.top * factor;
      el.style.setProperty('--parallax-y', `${offset}px`);
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [factor]);
}

// SplitWords: wrap each whitespace-separated chunk in a <span class="word">
// with a staggered transition-delay. IntersectionObserver flips .is-visible
// on the parent to trigger the reveal.
function SplitWords({ children, perWordDelay = 60, baseDelay = 0, as: As = 'span', className = '', ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Toggle .is-visible so the per-word stagger replays on each entry.
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) el.classList.add('is-visible');
      else el.classList.remove('is-visible');
    }, { threshold: 0.2, rootMargin: '0px 0px -10% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Flatten children to a string + collect non-string nodes
  const renderNode = (node, keyBase) => {
    if (typeof node === 'string') {
      const words = node.split(/(\s+)/); // keeps whitespace
      return words.map((w, i) => {
        if (/^\s+$/.test(w)) return w; // preserve spaces literally
        const idx = (window.__sw_idx = (window.__sw_idx || 0) + 1);
        return (
          <span
            key={`${keyBase}-${i}`}
            className="word"
            style={{ transitionDelay: `${baseDelay + idx * perWordDelay}ms` }}
          >{w}</span>
        );
      });
    }
    if (React.isValidElement(node)) {
      // recurse into children
      return React.cloneElement(node, { key: keyBase }, renderNode(node.props.children, `${keyBase}-c`));
    }
    if (Array.isArray(node)) {
      return node.map((n, i) => renderNode(n, `${keyBase}-${i}`));
    }
    return node;
  };

  // Reset the per-instance counter before rendering each instance
 done in a closure
  window.__sw_idx = 0;

  return (
    <As ref={ref} className={`split-words ${className}`} {...rest}>
      {renderNode(children, 'w')}
    </As>
  );
}

Object.assign(window, { useReveal, useCounter, useScrolled, ScrollProgress, useParallax, SplitWords });
