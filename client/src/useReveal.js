import { useEffect } from 'react';

export default function useReveal() {
  useEffect(() => {
    const els = [...document.querySelectorAll('.reveal')];
    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.16 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
