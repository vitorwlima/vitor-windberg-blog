import { useState } from 'react'
import { MenuIcon, XIcon, SunIcon } from '@heroicons/react/solid'

import { Logo } from '../'
import { colors } from 'src/styles/colors'
import { Languages } from 'src/graphql/generated/graphql'
import { useLanguage } from 'src/hooks/useLanguage'

const MainMenu = () => {
  const { language, setLanguage } = useLanguage()
  const [showMenu, setShowMenu] = useState(false)
  const menuPosition = showMenu ? '' : '-translate-x-full'

  const languages = [
    {
      image: '/brazil.svg',
      label: 'Português',
      value: Languages.Portuguese,
      active: language === Languages.Portuguese,
    },
    {
      image: '/united_states.svg',
      label: 'English',
      value: Languages.English,
      active: language === Languages.English,
    },
  ]

  const switchLanguage = () => {
    const value =
      language === Languages.Portuguese
        ? Languages.English
        : Languages.Portuguese
    setLanguage(value)
  }

  return (
    <div>
      <button className="lg:hidden">
        <MenuIcon
          className="h-6 w-6"
          onClick={() => setShowMenu((prev) => !prev)}
        />
      </button>
      <div
        className={`${menuPosition} absolute inset-0 h-screen overflow-hidden bg-white p-2 transition-transform lg:hidden`}
      >
        <header className="flex justify-between">
          <Logo />
          <button>
            <XIcon
              className="h-6 w-6"
              onClick={() => setShowMenu((prev) => !prev)}
            />
          </button>
        </header>
        <div className="mt-16 flex flex-col gap-16">
          <section className="flex flex-col gap-4">
            {languages.map((language) => (
              <button
                onClick={() => switchLanguage()}
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
          <section>
            <button className="flex items-center gap-4">
              <SunIcon color={colors.main} className="h-8 w-8" />
              <p>Tema claro</p>
            </button>
          </section>
          <section>
            <button className="w-full rounded-md bg-blue-main p-2 font-bold text-white transition-all hover:opacity-90">
              Inscrever-se
            </button>
          </section>
        </div>
      </div>

      <div className="hidden gap-16 lg:flex">
        <section className="flex items-center gap-4">
          <button>
            <SunIcon color={colors.main} className="h-8 w-8" />
          </button>
          <button onClick={() => switchLanguage()}>
            <img
              src={languages.find((item) => item.active)?.image}
              className="h-8 w-8"
            />
          </button>
        </section>
        <section>
          <button className="rounded-md bg-blue-main py-2 px-8 font-bold text-white transition-all hover:opacity-90">
            Inscrever-se
          </button>
        </section>
      </div>
    </div>
  )
}

export { MainMenu }
