import './style.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

const lenis = new Lenis({ lerp: 0.08, smoothWheel: true })
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)

const nav = document.getElementById('nav')
ScrollTrigger.create({
  start: 'top -80',
  onUpdate: (self) => nav.classList.toggle('scrolled', self.scroll() > 80),
})

const toggle = document.getElementById('mobile-toggle')
const menu = document.getElementById('mobile-menu')
toggle?.addEventListener('click', () => menu.classList.toggle('open'))
menu?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => menu.classList.remove('open')))

function initHero() {
  const pre = document.querySelector('.hero-pre')
  const lines = document.querySelectorAll('.hero-title .line')
  const sub = document.querySelector('.hero-sub')
  const ctas = document.querySelector('.hero-ctas')
  const scrollHint = document.querySelector('.hero-scroll-hint')

  const tl = gsap.timeline({ delay: 0.15 })
  tl.to(pre, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
    .to(lines, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }, 0.2)
    .to(sub, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.7)
    .to(ctas, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.9)
    .to(scrollHint, { opacity: 1, duration: 0.5 }, 1.3)
}

function initReveals() {
  const selectors = [
    '#services .section-tag', '#services .section-title', '#services .service-card',
    '#how .section-tag', '#how .section-title', '#how .step',
    '#about .section-tag', '#about .section-title', '#about .about-columns p',
    '#about .about-quote', '#about .about-links',
    '#contact .section-tag', '#contact .section-title',
    '#contact .contact-sub', '#contact .contact-ctas',
  ]

  selectors.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el, i) => {
      gsap.from(el, {
        opacity: 0, y: 24, duration: 0.65, ease: 'power3.out', delay: i * 0.06,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      })
    })
  })
}

window.addEventListener('DOMContentLoaded', () => {
  initHero()
  initReveals()
})
