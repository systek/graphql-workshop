import React from 'react'
import cn from 'classnames'

import css from './Card.module.css'

const Card = ({ className, children }) => (
  <div className={cn(css.card, className)}>{children}</div>
)

export default Card
