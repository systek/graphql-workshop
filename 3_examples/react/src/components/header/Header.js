import React from 'react'
import DarkTheme, { applyTheme } from 'react-dark-theme'

import Cart from './stats/Stats'
import css from './Header.module.css'

const normalTheme = {
  background: '#b4bdc0',
  foreground: '#e3f9ff',
  text: '#200101',
  accent: '#a239ca',
}

const darkTheme = {
  background: '#121212',
  foreground: '#1e1e1e',
  text: '#e2e2e2',
  accent: '#a239ca',
}

applyTheme(normalTheme)

const Header = () => (
  <header className={css.header}>
    <h1>Sushi Shop System</h1>
    <div className={css.themeWrapper}>
      <DarkTheme defaultDark light={normalTheme} dark={darkTheme} />
    </div>
    <Cart />
  </header>
)

export default Header
