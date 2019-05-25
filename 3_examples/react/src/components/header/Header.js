import React from 'react'

import Cart from './stats/Stats'
import css from './Header.module.css'

const Header = () => (
  <header className={css.header}>
    <h1>Sushi Shop System</h1>
    <Cart />
  </header>
)

export default Header
