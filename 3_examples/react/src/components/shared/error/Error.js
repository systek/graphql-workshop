import React from 'react'
import cn from 'classnames'

import css from './Error.module.css'

const Error = ({ error, smoll }) => {
  return (
    <div className={cn(css.error, { [css.smoll]: smoll })}>
      {!smoll ? (
        <h3 title={error.message}>Oh no! An unexpected error has occured.</h3>
      ) : (
        <div>X</div>
      )}
    </div>
  )
}

export default Error
