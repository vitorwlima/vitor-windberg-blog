import { useState } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid'

import { Logo } from '../Logo'
import { useLanguage } from 'src/helpers/language'

const MainMenu = () => {
  const [showMenu, setShowMenu] = useState(false)
  const { languages, setLanguage, switchLanguage } = useLanguage()

  const menuPosition = showMenu ? '' : '-translate-x-full'

  return (
    <div>
      <button className="lg:hidden">
        <Bars3Icon
          className="h-6 w-6"
          onClick={() => setShowMenu((prev) => !prev)}
        />
      </button>
      <div
        className={`${menuPosition} absolute inset-0 h-screen overflow-hidden bg-neutral-700 py-10 px-6 transition-transform lg:hidden`}
      >
        <header className="flex justify-between">
          <Logo />
          <button>
            <XMarkIcon
              className="h-6 w-6"
              onClick={() => setShowMenu((prev) => !prev)}
            />
          </button>
        </header>
        <div className="mt-16 flex flex-col gap-16">
          <section className="flex flex-col gap-4">
            {languages.map((language) => (
              <button
                onClick={() => setLanguage(language.value)}
                className="flex max-w-max items-center gap-4"
                key={language.value}
              >
                <img src={language.image} className="h-8 w-8" />
                <p className={language.active ? 'font-bold' : ''}>
                  {language.label}
                </p>
              </button>
            ))}
          </section>
        </div>
      </div>

      <div className="hidden gap-16 lg:flex">
        <button onClick={() => switchLanguage()}>
          <img
            src={languages.find((item) => item.active)!.image}
            className="h-8 w-8"
          />
        </button>
      </div>
    </div>
  )
}

export { MainMenu }
