'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const HEADLINE = 'WELCOME ITZFIZZ';
const STATS = [
  { value: '98%', label: 'Customer satisfaction' },
  { value: '75%', label: 'Faster page loads' },
  { value: '60%', label: 'Higher engagement' },
  { value: '92%', label: 'Return visitors' },
];

export default function Home() {
  const wrap = useRef(null);
  const car = useRef(null);
  const road = useRef(null);
  const headline = useRef(null);
  const stats = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // 1) Intro: headline letters, then stats one by one
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('.letter', { y: 50, opacity: 0, duration: 0.9, stagger: 0.05 })
        .from('.stat', { y: 30, opacity: 0, duration: 0.8, stagger: 0.18 }, '-=0.3')
        .from(car.current, { opacity: 0, duration: 0.8 }, '<');

      // 2) Scroll: progress is tied to scrollbar; scrub adds smooth interpolation
      gsap.timeline({
        scrollTrigger: {
          trigger: wrap.current, start: 'top top', end: 'bottom bottom',
          scrub: 1, invalidateOnRefresh: true,
        },
      })
        .to(car.current, { x: () => window.innerWidth * 0.75, ease: 'none' }, 0)
        .to('.wheel', { rotation: 900, ease: 'none' }, 0)
        .to(road.current, { backgroundPositionX: '-900px', ease: 'none' }, 0)
        .to(headline.current, { y: -60, opacity: 0.2, scale: 0.96, ease: 'none' }, 0)
        .to(stats.current, { y: -40, ease: 'none' }, 0);
    }, wrap);
    return () => ctx.revert();
  }, []);

  return (
    <main>
      {/* Tall wrapper gives scroll distance; inner section stays pinned (sticky) */}
      <div ref={wrap} className="relative h-[300vh]">
        <section className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center px-6">
          <h1 ref={headline} className="text-center text-2xl md:text-5xl font-light tracking-[0.5em] will-change-transform">
            {HEADLINE.split('').map((c, i) => (
              <span key={i} className="letter inline-block">{c === ' ' ? '\u00A0' : c}</span>
            ))}
          </h1>

          <div ref={stats} className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-8 text-center will-change-transform">
            {STATS.map((s) => (
              <div key={s.label} className="stat">
                <div className="text-4xl md:text-6xl font-semibold text-cyan-300">{s.value}</div>
                <p className="mt-2 text-xs md:text-sm text-white/60 max-w-[10rem] mx-auto">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Road + car */}
          <div className="absolute bottom-[12vh] left-0 w-full">
            <div ref={road} className="road h-1 w-full opacity-30 mt-[70px]" />
            <svg ref={car} viewBox="0 0 300 120" className="absolute -top-8 left-[4vw] w-[200px] md:w-[300px] will-change-transform">
              <path d="M10 85 L20 60 Q30 50 60 48 L100 20 Q110 14 130 14 L190 14 Q205 14 215 26 L240 50 Q285 54 290 80 L290 90 L10 90 Z" fill="#22d3ee" />
              <path d="M110 24 L128 24 L128 48 L82 48 Z M138 24 L190 24 L215 48 L138 48 Z" fill="#0a0a0f" opacity="0.75" />
              {[80, 230].map((cx) => (
                <g key={cx}>
                  <circle cx={cx} cy="92" r="24" fill="#111" stroke="#fff" strokeWidth="3" />
                  <g className="wheel">
                    <circle cx={cx} cy="92" r="10" fill="#444" />
                    <rect x={cx - 1.5} y="70" width="3" height="44" fill="#fff" />
                    <rect x={cx - 22} y="90.5" width="44" height="3" fill="#fff" />
                  </g>
                </g>
              ))}
            </svg>
          </div>
        </section>
      </div>

      <section className="h-screen flex items-center justify-center text-white/60 tracking-[0.3em] text-sm">
        NEXT SECTION
      </section>
    </main>
  );
}
