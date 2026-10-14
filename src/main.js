import '@fontsource/gloock'
import '@fontsource-variable/figtree'
import './styles/main.css'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { initStatus } from './js/status.js'
import { initLightbox } from './js/lightbox.js'

gsap.registerPlugin(ScrollTrigger)

const root = document.documentElement
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const $ = (s, el = document) => el.querySelector(s)
const $$ = (s, el = document) => [...el.querySelectorAll(s)]

// The staged layouts (pinned hero, salão, salgados) exist only when motion is allowed;
// without JS or under reduced motion the page is a complete static layout.
if (!reduced) root.classList.add('motion')

initStatus()

/* Scroll: Lenis drives ScrollTrigger; reduced motion keeps the native scroll. */
let lenis = null
if (!reduced) {
  lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.95, anchors: false })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((t) => lenis.raf(t * 1000))
  gsap.ticker.lagSmoothing(0)
  // Pins add height after Lenis measured the page: keep its scroll limit in sync.
  ScrollTrigger.addEventListener('refresh', () => lenis.resize())
}
const scrollTo = (y, opts = {}) => {
  if (lenis) {
    lenis.resize()
    lenis.scrollTo(y, { duration: 1.4, ...opts })
  } else window.scrollTo({ top: y, behavior: 'auto' })
}

/* Header: solid after the fold, and it takes the material of the section under it */
const top = $('[data-top]')
const heroEl = $('#inicio')
const themed = $$('[data-theme]').filter((el) => el !== top)
function headerState() {
  top.dataset.scrolled = String(window.scrollY > 24)
  // The opening carries its own live status; the header's copy waits until it has gone.
  top.dataset.overHero = String(window.scrollY < heroEl.offsetHeight - window.innerHeight * 0.5)
  const probe = (top.offsetHeight || 70) * 0.5
  let theme = ''
  for (const el of themed) {
    const r = el.getBoundingClientRect()
    if (r.top <= probe && r.bottom > probe) theme = el.dataset.theme
  }
  top.dataset.theme = theme
}
window.addEventListener('scroll', headerState, { passive: true })
headerState()

/* Mobile menu */
const menu = $('[data-menu]')
const menuBtn = $('[data-menu-open]')
function setMenu(open, { focus = true } = {}) {
  menuBtn.setAttribute('aria-expanded', String(open))
  menuBtn.querySelector('.menu-btn-label').textContent = open ? 'Fechar' : 'Menu'
  top.dataset.menuState = open ? 'open' : ''
  if (open) {
    menu.hidden = false
    requestAnimationFrame(() => (menu.dataset.open = 'true'))
    lenis?.stop()
    document.body.style.overflow = 'hidden'
    if (focus) setTimeout(() => $('a', menu)?.focus(), 80)
  } else {
    menu.dataset.open = 'false'
    lenis?.start()
    document.body.style.overflow = ''
    setTimeout(() => { if (menu.dataset.open === 'false') menu.hidden = true }, reduced ? 0 : 560)
    if (focus) menuBtn.focus()
  }
}
menuBtn.addEventListener('click', () => setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'))
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menu.dataset.open === 'true') setMenu(false)
  // Keep Tab inside the open menu (and the header button that closes it).
  if (e.key === 'Tab' && menu.dataset.open === 'true') {
    const items = [menuBtn, ...$$('a, button', menu)]
    const i = items.indexOf(document.activeElement)
    if (e.shiftKey && i <= 0) { e.preventDefault(); items.at(-1).focus() }
    else if (!e.shiftKey && i === items.length - 1) { e.preventDefault(); items[0].focus() }
  }
})
window.matchMedia('(min-width: 961px)').addEventListener('change', (e) => {
  if (e.matches && menu.dataset.open === 'true') setMenu(false, { focus: false })
})

/* In-page links go through Lenis */
const yOf = (el) => el.getBoundingClientRect().top + window.scrollY
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]')
  if (!a) return
  const id = a.getAttribute('href').slice(1)
  const target = id ? document.getElementById(id) : null
  if (!target) return
  e.preventDefault()
  const fromMenu = a.hasAttribute('data-menu-link')
  if (fromMenu) setMenu(false, { focus: false })
  const go = () => {
    scrollTo(id === 'inicio' ? 0 : yOf(target))
    history.replaceState(null, '', `#${id}`)
    // Move focus for keyboard and screen-reader users without a second jump.
    const focusTarget = target.querySelector('h1, h2, h3') || target
    focusTarget.setAttribute('tabindex', '-1')
    focusTarget.focus({ preventScroll: true })
  }
  fromMenu ? setTimeout(go, reduced ? 0 : 320) : go()
})

/* ---------- Motion ---------- */

// Reveals that a keyboard user may reach before the scroll does: finish them on focus.
const pending = new WeakMap()
document.addEventListener('focusin', (e) => {
  const el = e.target.closest('.piece, [data-sill]')
  pending.get(el)?.progress(1)
})

if (!reduced) {
  // Headings rise out of their own line.
  $$('[data-rise]').forEach((h) => {
    const inner = document.createElement('span')
    inner.className = 'rise-in'
    inner.append(...h.childNodes)
    const mask = document.createElement('span')
    mask.className = 'rise-mask'
    mask.append(inner)
    h.append(mask)
    gsap.fromTo(inner, { yPercent: 104 }, {
      yPercent: 0, duration: 1.15, ease: 'expo.out',
      scrollTrigger: { trigger: h, start: 'top 90%', once: true },
    })
  })

  heroStage()
  vitrineReveals()
  paesBand()
  salaoStage()
  casaFlood()
  instaDrift()
}

/* Signature: the arcade of the salão. The middle arch is the facade; on scroll the
   stage holds, the side arches part like doors, and the facade widens until it is
   the whole screen and the address lands on it. */
function heroStage() {
  const stage = $('[data-hero]')
  const center = $('[data-arch-center]', stage)
  const sides = $$('[data-arch-side]', stage)
  const centerPic = $('picture', center)
  const centerImg = $('img', center)
  const before = sides.filter((s) => s.compareDocumentPosition(center) & Node.DOCUMENT_POSITION_FOLLOWING)
  const after = sides.filter((s) => !before.includes(s))

  // The facade leaves the row for a full-stage layer; a slot keeps its place in the arcade.
  const slot = document.createElement('div')
  slot.className = 'arch arch--c arch-slot'
  slot.setAttribute('aria-hidden', 'true')
  center.before(slot)
  stage.append(center)
  center.classList.add('is-staged')

  const geo = () => {
    const s = stage.getBoundingClientRect()
    const r = slot.getBoundingClientRect()
    return { t: r.top - s.top, r: s.right - r.right, b: s.bottom - r.bottom, l: r.left - s.left, rad: r.width / 2 }
  }
  const clipAt = (g) => `inset(${g.t}px ${g.r}px ${g.b}px ${g.l}px round ${g.rad}px ${g.rad}px 0px 0px)`
  const open = 'inset(0px 0px 0px 0px round 0px 0px 0px 0px)'
  gsap.set(center, { clipPath: () => clipAt(geo()) })

  const arrive = $$('[data-hero-arrive] > *', stage)
  gsap.timeline({
    scrollTrigger: { trigger: stage, start: 'top top', end: '+=135%', pin: true, scrub: 0.8, invalidateOnRefresh: true },
  })
    .fromTo(center, { clipPath: () => clipAt(geo()) }, { clipPath: open, ease: 'power2.inOut', duration: 1 }, 0)
    .fromTo(centerImg, { scale: 1.16 }, { scale: 1, ease: 'none', duration: 1 }, 0)
    .to(before, { xPercent: -70, yPercent: 18, ease: 'power2.in', duration: 0.75 }, 0)
    .to(after, { xPercent: 70, yPercent: 18, ease: 'power2.in', duration: 0.75 }, 0)
    .to('[data-hero-copy]', { yPercent: -35, opacity: 0, ease: 'power2.in', duration: 0.42 }, 0)
    .fromTo(center, { '--scrim': 0 }, { '--scrim': 1, ease: 'none', duration: 0.35 }, 0.6)
    .fromTo(arrive, { autoAlpha: 0, y: 46 }, { autoAlpha: 1, y: 0, stagger: 0.08, ease: 'power2.out', duration: 0.3 }, 0.7)
    .to({}, { duration: 0.18 })

  // Opening: the arches rise from the floor, centre first, then outwards; the title rises out of its lines.
  const order = [centerPic, ...$$('[data-arch-side] picture', stage).sort((a, b) => {
    const d = (el) => Math.abs(sides.indexOf(el.closest('.arch')) - (before.length - 0.5))
    return d(a) - d(b)
  })]
  gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.1, onComplete: () => root.classList.add('js-ready') })
    .fromTo(order, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, stagger: 0.12, ease: 'expo.inOut' }, 0)
    .fromTo($$('img', stage).filter((i) => i !== centerImg), { scale: 1.2 }, { scale: 1, duration: 2.2 }, 0.1)
    .fromTo('.hero-title .ln > span', { yPercent: 110 }, { yPercent: 0, duration: 1.3, stagger: 0.1 }, 0.35)
    .fromTo('.hero-meta', { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 1 }, 0.85)
    .set([...order, '.hero-title .ln > span', '.hero-meta'], { clearProps: 'transform,clipPath,opacity,visibility' })
}

/* The vitrine. Rectangles rise from the sill, arches open from the middle like a door,
   the picture settles inside. Pieces at different depths drift at different speeds. */
function vitrineReveals() {
  const stacked = () => window.matchMedia('(min-width: 961px) and (min-height: 621px)').matches
  $$('.piece').forEach((p) => {
    if (p.closest('.paes-band')) return
    if (p.closest('[data-stack]') && stacked()) return
    const btn = $('.piece-open', p)
    const img = $('img', p)
    const arch = p.classList.contains('piece--arch')
    const from = arch ? 'inset(0% 50% 0% 50%)' : 'inset(100% 0% 0% 0%)'
    const t = gsap.timeline({ scrollTrigger: { trigger: p, start: 'top 88%', once: true } })
      .fromTo(btn, { clipPath: from }, { clipPath: 'inset(0% 0% 0% 0%)', duration: arch ? 1.5 : 1.3, ease: 'expo.inOut' })
      .fromTo(img, { scale: 1.22 }, { scale: 1, duration: 1.9, ease: 'expo.out' }, 0.05)
      .fromTo($('figcaption:not(.sr)', p), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 0.55)
      .set(btn, { clearProps: 'clipPath' })
    pending.set(p, t)
  })

  $$('[data-sill]').forEach((f) => {
    const pic = $('picture', f)
    const t = gsap.timeline({ scrollTrigger: { trigger: f, start: 'top 86%', once: true } })
      .fromTo(pic, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut' })
      .fromTo($('img', pic), { scale: 1.2 }, { scale: 1, duration: 2, ease: 'expo.out' }, 0.05)
      .set(pic, { clearProps: 'clipPath' })
    pending.set(f, t)
  })

  $$('[data-depth]').forEach((el) => {
    const d = Number(el.dataset.depth)
    gsap.fromTo(el, { yPercent: d * 100 }, {
      yPercent: -d * 100, ease: 'none',
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
    })
  })

  // The shelf index: lines settle in one after the other.
  gsap.from('.shelf-nav li', {
    opacity: 0, y: 28, duration: 1, stagger: 0.07, ease: 'expo.out',
    scrollTrigger: { trigger: '.shelf-nav', start: 'top 85%', once: true },
  })

  // Salgados on desktop: one frame on the turquoise counter, each photo rises over the last.
  const mm = gsap.matchMedia()
  mm.add('(min-width: 961px) and (min-height: 621px)', () => {
    const stage = $('[data-stack]')
    const pieces = $$('.piece', stage)
    const btns = pieces.map((p) => $('.piece-open', p))
    const imgs = pieces.map((p) => $('img', p))
    const index = $$('.salg-index li', stage)
    const steps = pieces.length - 1
    gsap.set(btns.slice(1), { clipPath: 'inset(100% 0% 0% 0%)' })
    gsap.set(imgs.slice(1), { scale: 1.25 })
    const mark = (i) => index.forEach((li, k) => li.classList.toggle('is-active', k === i))
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: stage, start: 'top top', end: `+=${steps * 75}%`, pin: true, scrub: 0.7,
        snap: { snapTo: 1 / steps, duration: { min: 0.25, max: 0.6 }, ease: 'power2.inOut' },
        onUpdate: (self) => mark(Math.round(self.progress * steps)),
      },
    })
    for (let i = 1; i <= steps; i++) {
      const at = i - 1
      tl.to(btns[i], { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8, ease: 'power3.inOut' }, at + 0.1)
        .to(imgs[i], { scale: 1, duration: 0.9, ease: 'power2.out' }, at + 0.1)
        .to(imgs[i - 1], { scale: 0.94, duration: 0.8, ease: 'power2.inOut' }, at + 0.1)
    }
    // Keyboard: focusing a photo still under the counter moves the stage to it.
    const onFocus = (e) => {
      const i = btns.indexOf(e.target)
      if (i < 0 || !tl.scrollTrigger) return
      const st = tl.scrollTrigger
      const y = st.start + (i / steps) * (st.end - st.start)
      lenis ? lenis.scrollTo(y, { immediate: true, force: true }) : window.scrollTo(0, y)
      ScrollTrigger.update()
      tl.progress(i / steps)
    }
    stage.addEventListener('focusin', onFocus)
    return () => {
      stage.removeEventListener('focusin', onFocus)
      gsap.set([...btns, ...imgs], { clearProps: 'all' })
    }
  })
}

/* Pães e folhados: the croissants full-bleed, pulling back as you pass. */
function paesBand() {
  const band = $('[data-band]')
  if (!band) return
  gsap.fromTo($('img', band), { scale: 1.32, yPercent: -6 }, {
    scale: 1, yPercent: 6, ease: 'none',
    scrollTrigger: { trigger: band, start: 'top bottom', end: 'bottom top', scrub: true },
  })
  gsap.fromTo(band, { clipPath: 'inset(8% 6% 8% 6%)' }, {
    clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.out',
    scrollTrigger: { trigger: band, start: 'top 95%', end: 'top 20%', scrub: 0.6 },
  })
  gsap.from($$('.paes-head p', band), {
    autoAlpha: 0, y: 24, duration: 1, ease: 'expo.out',
    scrollTrigger: { trigger: band, start: 'top 40%', once: true },
  })
}

/* O salão: the room holds still at night while a second and a third view rise through
   an arch, the way the vault frames the palms. */
function salaoStage() {
  const stage = $('[data-salao]')
  const layers = $$('.salao-layer', stage)
  const steps = $$('.salao-steps li', stage)
  const archFrom = () =>
    window.innerWidth < 761
      ? 'inset(100% 10% 0% 10% round 40vw 40vw 0vw 0vw)'
      : 'inset(100% 26% 0% 26% round 24vw 24vw 0vw 0vw)'
  const archMid = () =>
    window.innerWidth < 761
      ? 'inset(22% 10% 0% 10% round 40vw 40vw 0vw 0vw)'
      : 'inset(16% 26% 0% 26% round 24vw 24vw 0vw 0vw)'
  const full = 'inset(0% 0% 0% 0% round 0vw 0vw 0vw 0vw)'
  layers.slice(1).forEach((l) => gsap.set(l, { clipPath: archFrom }))

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: stage, start: 'top top', end: '+=220%', pin: true, scrub: 0.8, invalidateOnRefresh: true,
      onUpdate: (self) => {
        const i = self.progress < 0.36 ? 0 : self.progress < 0.72 ? 1 : 2
        steps.forEach((li, k) => li.classList.toggle('is-active', k === i))
      },
    },
  })
  tl.fromTo($('img', layers[0]), { scale: 1.18, xPercent: -3 }, { scale: 1.02, xPercent: 3, ease: 'none', duration: 1 }, 0)
  const captions = layers.map((l) => $('figcaption', l))
  gsap.set(captions.slice(1), { autoAlpha: 0 })
  layers.slice(1).forEach((l, i) => {
    const at = 0.18 + i * 0.36
    // One caption at a time: the old one leaves as the next view starts to rise.
    tl.to(captions[i], { autoAlpha: 0, duration: 0.06, ease: 'none' }, at)
      .fromTo(captions[i + 1], { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.1, ease: 'power2.out' }, at + 0.24)
      .fromTo(l, { clipPath: archFrom }, { clipPath: archMid, ease: 'power2.out', duration: 0.16 }, at)
      .to(l, { clipPath: full, ease: 'power2.inOut', duration: 0.16 }, at + 0.16)
      .fromTo($('img', l), { scale: 1.3 }, { scale: 1, ease: 'power1.out', duration: 0.4 }, at)
  })
  tl.to({}, { duration: 0.08 })
  gsap.from($$('[data-salao-copy] p', stage), {
    autoAlpha: 0, y: 24, duration: 1, ease: 'expo.out',
    scrollTrigger: { trigger: stage, start: 'top 45%', once: true },
  })
}

/* A casa: the canopy turquoise rises through an arch until it owns the page. */
function casaFlood() {
  const flood = $('[data-flood]')
  if (!flood) return
  const from = () => (window.innerWidth < 761 ? 'inset(62% 14% 0% 14% round 40vw 40vw 0vw 0vw)' : 'inset(58% 30% 0% 30% round 22vw 22vw 0vw 0vw)')
  gsap.fromTo(flood, { clipPath: from }, {
    clipPath: 'inset(0% 0% 0% 0% round 0vw 0vw 0vw 0vw)', ease: 'power2.inOut',
    scrollTrigger: { trigger: '.casa', start: 'top 92%', end: 'top 18%', scrub: 0.6, invalidateOnRefresh: true },
  })
  gsap.fromTo('[data-rules] li span', { yPercent: 105 }, {
    yPercent: 0, duration: 1.1, stagger: 0.12, ease: 'expo.out',
    scrollTrigger: { trigger: '[data-rules]', start: 'top 85%', once: true },
  })
}

/* Instagram: the house's photos drift past like a feed being scrolled. */
function instaDrift() {
  const strip = $('[data-strip]')
  const track = $('[data-strip-track]')
  if (!strip || !track) return
  gsap.fromTo(track, { x: 0 }, {
    x: () => -Math.max(0, track.scrollWidth - strip.clientWidth), ease: 'none',
    scrollTrigger: { trigger: strip, start: 'top bottom', end: 'bottom top', scrub: 0.5, invalidateOnRefresh: true },
  })
  gsap.from('.highlights li', {
    opacity: 0, y: 20, scale: 0.9, duration: 0.9, stagger: 0.06, ease: 'expo.out',
    scrollTrigger: { trigger: '.highlights', start: 'top 88%', once: true },
  })
}

/* Lightbox */
initLightbox({
  reduced,
  onOpen: () => lenis?.stop(),
  onClose: () => lenis?.start(),
})

/* Map: loads from Google only on request */
const mapBtn = $('[data-map-load]')
mapBtn?.addEventListener('click', () => {
  const iframe = document.createElement('iframe')
  iframe.src = mapBtn.dataset.src
  iframe.title = 'Mapa com a localização da Saint Tropez Confeitaria na Rua Piracema, 221'
  iframe.loading = 'lazy'
  iframe.referrerPolicy = 'no-referrer-when-downgrade'
  iframe.allowFullscreen = true
  mapBtn.replaceWith(iframe)
  $('.map-note').textContent = 'Mapa do Google.'
})

/* Section highlight in the nav */
const navLinks = $$('.nav a')
$$('main > section[id]').forEach((sec) => {
  ScrollTrigger.create({
    trigger: sec,
    start: 'top 45%',
    end: 'bottom 45%',
    onToggle: ({ isActive }) => {
      if (!isActive) return
      navLinks.forEach((a) => a.setAttribute('aria-current', String(a.getAttribute('href') === `#${sec.id}`)))
    },
  })
})
ScrollTrigger.addEventListener('refresh', headerState)

/* Fonts and images change layout: refresh the scroll math once they settle. */
document.fonts?.ready.then(() => ScrollTrigger.refresh())
window.addEventListener('load', () => {
  ScrollTrigger.refresh()
  if (location.hash) {
    const t = document.getElementById(location.hash.slice(1))
    if (t) setTimeout(() => scrollTo(yOf(t), { immediate: true }), 60)
  }
})
