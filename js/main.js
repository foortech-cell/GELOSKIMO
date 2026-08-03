/* ==========================================================================
   GELO SKIMÓ — main.js
   ========================================================================== */
(() => {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;

  gsap.registerPlugin(ScrollTrigger, SplitText);

  /* ------------------------------------------------------------------
     SMOOTH SCROLL (Lenis) + ScrollTrigger bridge
  ------------------------------------------------------------------ */
  let lenis;
  if (!prefersReduced) {
    lenis = new Lenis({ duration: 1.1, smoothWheel: true, lerp: 0.1 });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  /* ------------------------------------------------------------------
     PRELOADER
  ------------------------------------------------------------------ */
  const preloader = document.getElementById("preloader");
  const ring = document.querySelector(".preloader__ring");
  const pctEl = document.querySelector(".preloader__pct");
  const circumference = 502;

  let preloaderDone = false;
  let fontsAreReady = false;
  function tryPlayHeroIntro() {
    if (preloaderDone && fontsAreReady) playHeroIntro();
  }
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => {
    fontsAreReady = true;
    tryPlayHeroIntro();
  });

  function finishPreload() {
    const tl = gsap.timeline({
      onComplete: () => {
        preloader.classList.add("is-done");
        document.body.style.overflow = "";
        preloaderDone = true;
        tryPlayHeroIntro();
      },
    });
    tl.to(ring, { strokeDashoffset: 0, duration: 0.4, ease: "power2.out" })
      .to(preloader.querySelector(".preloader__inner"), { scale: 1.15, opacity: 0, duration: 0.5, ease: "power2.in" }, "-=0.1")
      .to(preloader, { autoAlpha: 0, duration: 0.5 }, "-=0.3");
  }

  document.body.style.overflow = "hidden";
  let progress = { val: 0 };
  gsap.to(progress, {
    val: 100,
    duration: 1.6,
    ease: "power1.inOut",
    onUpdate: () => {
      const p = Math.round(progress.val);
      pctEl.textContent = p + "%";
      gsap.set(ring, { strokeDashoffset: circumference - (circumference * p) / 100 });
    },
    onComplete: finishPreload,
  });

  /* ------------------------------------------------------------------
     CUSTOM CURSOR
  ------------------------------------------------------------------ */
  if (!isTouch && !prefersReduced) {
    const cursor = document.getElementById("cursor");
    const dot = cursor.querySelector(".cursor__dot");
    const ringEl = cursor.querySelector(".cursor__ring");
    const moveDot = gsap.quickTo(dot, "x", { duration: 0.05, ease: "none" });
    const moveDotY = gsap.quickTo(dot, "y", { duration: 0.05, ease: "none" });
    const moveRing = gsap.quickTo(ringEl, "x", { duration: 0.35, ease: "power3.out" });
    const moveRingY = gsap.quickTo(ringEl, "y", { duration: 0.35, ease: "power3.out" });

    window.addEventListener("mousemove", (e) => {
      moveDot(e.clientX); moveDotY(e.clientY);
      moveRing(e.clientX); moveRingY(e.clientY);
    });

    document.querySelectorAll("[data-cursor='link'], .flavor-card, .use-card").forEach((el) => {
      el.addEventListener("mouseenter", () => cursor.classList.add("is-link"));
      el.addEventListener("mouseleave", () => cursor.classList.remove("is-link"));
    });
  }

  /* ------------------------------------------------------------------
     SCROLL PROGRESS BAR
  ------------------------------------------------------------------ */
  gsap.to("#scrollProgress", {
    width: "100%",
    ease: "none",
    scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 0.3 },
  });

  gsap.to(".hero__scroll", {
    opacity: 0,
    ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "180px top", scrub: true },
  });

  /* ------------------------------------------------------------------
     NAVBAR SHOW/HIDE + BACKGROUND ON SCROLL
  ------------------------------------------------------------------ */
  const nav = document.getElementById("nav");
  let lastY = window.scrollY;
  ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: (self) => {
      const y = window.scrollY;
      nav.classList.toggle("is-scrolled", y > 40);
      if (y > lastY && y > 200) nav.classList.add("is-hidden");
      else nav.classList.remove("is-hidden");
      lastY = y;
    },
  });

  const burger = document.getElementById("navBurger");
  const navMobile = document.getElementById("navMobile");
  burger.addEventListener("click", () => {
    navMobile.classList.toggle("is-open");
  });
  navMobile.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => navMobile.classList.remove("is-open"))
  );

  /* ------------------------------------------------------------------
     HERO — SplitText intro (played after preloader)
  ------------------------------------------------------------------ */
  let splitLines = [];
  document.querySelectorAll("[data-split]").forEach((el) => {
    splitLines.push(new SplitText(el, { type: "chars", charsClass: "char" }));
  });
  gsap.set(splitLines.flatMap((s) => s.chars), { yPercent: 120, rotate: 6, opacity: 0 });

  function playHeroIntro() {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.to(".hero__eyebrow", { opacity: 1, y: 0, duration: 0.8 })
      .to(splitLines[0].chars, { yPercent: 0, rotate: 0, opacity: 1, duration: 1, stagger: 0.035 }, "-=0.4")
      .to(splitLines[1].chars, { yPercent: 0, rotate: 0, opacity: 1, duration: 1, stagger: 0.035 }, "-=0.75")
      .to(".hero__subtitle", { opacity: 1, y: 0, duration: 0.9 }, "-=0.6")
      .to(".hero__cta", { opacity: 1, y: 0, duration: 0.9 }, "-=0.7")
      .to(".hero__logo-wrap", { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" }, "-=0.6")
      .from(".ice-cube", { opacity: 0, y: 60, scale: 0.6, stagger: 0.1, duration: 1, ease: "back.out(1.7)" }, "-=1");
  }

  /* ------------------------------------------------------------------
     HERO — floating ice cubes (idle float) + mouse parallax
  ------------------------------------------------------------------ */
  document.querySelectorAll(".ice-cube").forEach((cube, i) => {
    gsap.to(cube, {
      y: "+=22", x: i % 2 === 0 ? "+=10" : "-=10", rotate: i % 2 === 0 ? 6 : -6,
      duration: 3 + i * 0.4, repeat: -1, yoyo: true, ease: "sine.inOut",
    });
  });

  if (!isTouch && !prefersReduced) {
    const heroSection = document.getElementById("hero");
    heroSection.addEventListener("mousemove", (e) => {
      const { innerWidth: w, innerHeight: h } = window;
      const x = (e.clientX / w - 0.5) * 2;
      const y = (e.clientY / h - 0.5) * 2;
      gsap.to(".ice-cube--1", { x: x * -18, y: y * -18, duration: 0.6, overwrite: "auto" });
      gsap.to(".ice-cube--2", { x: x * 14, y: y * 14, duration: 0.6, overwrite: "auto" });
      gsap.to(".ice-cube--3", { x: x * 20, y: y * -14, duration: 0.6, overwrite: "auto" });
      gsap.to(".ice-cube--4", { x: x * -14, y: y * 18, duration: 0.6, overwrite: "auto" });
    });
  }

  /* ------------------------------------------------------------------
     HERO SNOW CANVAS
  ------------------------------------------------------------------ */
  (function snow() {
    const canvas = document.getElementById("snowCanvas");
    const ctx = canvas.getContext("2d");
    let w, h, flakes, visible = true, running = false;

    function resize() {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    }
    function init() {
      resize();
      const count = Math.min(80, Math.floor((w * h) / 18000));
      flakes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2 + 0.6,
        speed: Math.random() * 0.5 + 0.15,
        drift: Math.random() * 0.6 - 0.3,
        alpha: Math.random() * 0.5 + 0.2,
      }));
    }
    function draw() {
      if (!visible) { running = false; return; }
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#ffffff";
      flakes.forEach((f) => {
        ctx.globalAlpha = f.alpha;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
        f.y += f.speed;
        f.x += f.drift;
        if (f.y > h) { f.y = -5; f.x = Math.random() * w; }
      });
      ctx.globalAlpha = 1;
      requestAnimationFrame(draw);
    }
    function start() {
      if (running || prefersReduced || !visible) return;
      running = true;
      draw();
    }
    window.addEventListener("resize", resize);
    init();
    if (!prefersReduced) {
      const observer = new IntersectionObserver(
        (entries) => {
          visible = entries[0].isIntersecting;
          if (visible) start();
        },
        { threshold: 0 },
      );
      observer.observe(canvas);
    }
  })();

  /* ------------------------------------------------------------------
     MARQUEE — infinite loop
  ------------------------------------------------------------------ */
  const track = document.getElementById("marqueeTrack");
  const marqueeTween = gsap.to(track, {
    xPercent: -50,
    ease: "none",
    duration: 18,
    repeat: -1,
  });
  document.querySelector(".marquee").addEventListener("mouseenter", () => marqueeTween.timeScale(0.15));
  document.querySelector(".marquee").addEventListener("mouseleave", () => marqueeTween.timeScale(1));

  /* ------------------------------------------------------------------
     SCROLL REVEALS
  ------------------------------------------------------------------ */
  gsap.utils.toArray("[data-reveal]").forEach((el) => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%" },
    });
  });

  gsap.utils.toArray("[data-reveal-media]").forEach((el) => {
    gsap.to(el, {
      opacity: 1, scale: 1, duration: 1.3, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 85%" },
    });
  });

  gsap.utils.toArray(".flavor-card").forEach((card, i) => {
    gsap.from(card, {
      opacity: 0, y: 60, duration: 0.9, ease: "power3.out", delay: i * 0.06,
      scrollTrigger: { trigger: ".flavor-grid", start: "top 82%" },
    });
  });

  gsap.utils.toArray(".cube-card").forEach((card, i) => {
    gsap.to(card, {
      opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: i * 0.08,
      scrollTrigger: { trigger: ".cube-grid", start: "top 82%" },
    });
  });

  gsap.utils.toArray(".use-card").forEach((card, i) => {
    gsap.to(card, {
      opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: i * 0.08,
      scrollTrigger: { trigger: ".uses__grid", start: "top 85%" },
    });
  });

  /* ------------------------------------------------------------------
     ANIMATED COUNTERS
  ------------------------------------------------------------------ */
  gsap.utils.toArray("[data-counter]").forEach((el) => {
    const target = parseFloat(el.dataset.target);
    const numEl = el.querySelector(".stat__num");
    const counter = { val: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: () => {
        gsap.to(counter, {
          val: target, duration: 1.6, ease: "power2.out",
          onUpdate: () => (numEl.textContent = Math.round(counter.val)),
        });
      },
    });
  });

  /* ------------------------------------------------------------------
     MAGNETIC BUTTONS
  ------------------------------------------------------------------ */
  if (!isTouch && !prefersReduced) {
    document.querySelectorAll(".btn--magnetic").forEach((btn) => {
      const moveX = gsap.quickTo(btn, "x", { duration: 0.5, ease: "power3.out" });
      const moveY = gsap.quickTo(btn, "y", { duration: 0.5, ease: "power3.out" });
      btn.addEventListener("mousemove", (e) => {
        const r = btn.getBoundingClientRect();
        moveX((e.clientX - r.left - r.width / 2) * 0.35);
        moveY((e.clientY - r.top - r.height / 2) * 0.35);
      });
      btn.addEventListener("mouseleave", () => { moveX(0); moveY(0); });
    });
  }

  /* ------------------------------------------------------------------
     FLAVOR CARD 3D TILT
  ------------------------------------------------------------------ */
  if (!isTouch && !prefersReduced) {
    document.querySelectorAll("[data-tilt]").forEach((card) => {
      const rotX = gsap.quickTo(card, "rotationX", { duration: 0.5, ease: "power3.out" });
      const rotY = gsap.quickTo(card, "rotationY", { duration: 0.5, ease: "power3.out" });
      const moveY = gsap.quickTo(card, "y", { duration: 0.5, ease: "power3.out" });
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        rotY(px * 14);
        rotX(py * -14);
        moveY(-6);
      });
      card.addEventListener("mouseleave", () => { rotX(0); rotY(0); moveY(0); });
    });
  }

  /* ------------------------------------------------------------------
     CTA BAND ice-drip subtle parallax
  ------------------------------------------------------------------ */
  gsap.to(".cta-band__frost", {
    y: 60, ease: "none",
    scrollTrigger: { trigger: ".cta-band", start: "top bottom", end: "bottom top", scrub: true },
  });

  /* ------------------------------------------------------------------
     MISC — year, back to top
  ------------------------------------------------------------------ */
  document.getElementById("year").textContent = new Date().getFullYear();
  document.getElementById("backToTop").addEventListener("click", () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  });

  document.querySelectorAll("a[href^='#']").forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          if (lenis) lenis.scrollTo(target, { duration: 1.3, offset: -20 });
          else target.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });
})();
