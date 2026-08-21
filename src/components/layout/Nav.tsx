import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useScrollSpy } from '../../hooks/useScrollSpy'

const HOME_DOTS = [
  { id: 'home', index: '01' },
  { id: 'about', index: '02' },
  { id: 'services', index: '03' },
  { id: 'pricing', index: '04' },
]

const ABOUT_DOTS = [
  { id: 'hero', index: '01' },
  { id: 'my-story', index: '02' },
  { id: 'technical-arsenal', index: '03' },
  { id: 'timeline', index: '04' },
  { id: 'skills', index: '05' },
]

export default function Nav() {
  const { pathname } = useLocation()
  const isAbout = pathname === '/about'
  const dots = isAbout ? ABOUT_DOTS : HOME_DOTS
  const activeId = useScrollSpy(dots.map((d) => d.id))
  const [menuOpen, setMenuOpen] = useState(false)

  const activeIndex = dots.find((d) => d.id === activeId)?.index ?? dots[0].index
  const homeHref = (hash: string) => (isAbout ? `/${hash}` : hash)

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <nav className="fixed top-0 z-50 flex w-full items-center justify-between bg-milk/90 px-6 py-4 backdrop-blur-md md:px-8 md:py-6">
        <Link
          to="/"
          className="hover-trigger pointer-events-auto relative z-50 flex items-center gap-2 text-xl font-bold tracking-tighter md:text-2xl"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-grayBlue font-bold text-milk">
            S
          </span>
          SIDDHESH
        </Link>

        <div className="hidden gap-12 text-sm font-medium tracking-wide text-grayBlue/60 md:flex">
          <a href={homeHref('#home')} className="hover-trigger transition-colors hover:text-grayBlue">
            HOME
          </a>
          <Link
            to="/about"
            className={`hover-trigger transition-colors ${isAbout ? 'font-bold text-brandOrange' : 'hover:text-grayBlue'}`}
          >
            ABOUT
          </Link>
          <a href={homeHref('#services')} className="hover-trigger transition-colors hover:text-grayBlue">
            SERVICES
          </a>
        </div>

        <a
          href={homeHref('#contact')}
          className="hover-trigger dark-trigger hidden rounded-full border border-grayBlue px-6 py-2 text-sm font-bold text-grayBlue transition-all hover:bg-grayBlue hover:text-white md:block"
        >
          LET'S TALK
        </a>

        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="z-50 text-2xl text-grayBlue focus:outline-none md:hidden"
          aria-label="Toggle menu"
        >
          <i className={menuOpen ? 'fas fa-times' : 'fas fa-bars'} />
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-milk md:hidden"
          >
            <a href={homeHref('#home')} onClick={closeMenu} className="text-2xl font-bold text-grayBlue">
              HOME
            </a>
            <Link to="/about" onClick={closeMenu} className="text-2xl font-bold text-brandOrange">
              ABOUT
            </Link>
            <a href={homeHref('#services')} onClick={closeMenu} className="text-2xl font-bold text-grayBlue">
              SERVICES
            </a>
            <a
              href={homeHref('#contact')}
              onClick={closeMenu}
              className="rounded-full border border-grayBlue px-8 py-3 text-lg font-bold text-grayBlue"
            >
              LET'S TALK
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed right-8 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-6 md:flex">
        <div className="text-xl font-bold text-grayBlue">{activeIndex}</div>
        {dots.map((dot) => (
          <a
            key={dot.id}
            href={`#${dot.id}`}
            data-index={dot.index}
            className={`dot-link hover-trigger h-2 w-2 rounded-full bg-gray-300 hover:bg-grayBlue ${
              activeId === dot.id ? 'dot-active' : ''
            }`}
          />
        ))}
        <div className="h-16 w-[1px] bg-gray-300" />
        <div className="-rotate-90 text-[10px] font-bold tracking-widest text-gray-400">SCROLL</div>
      </div>
    </>
  )
}
