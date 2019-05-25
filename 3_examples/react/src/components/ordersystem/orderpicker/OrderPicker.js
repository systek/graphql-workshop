import React from 'react'

import Dish from './dish/Dish'
import css from './OrderPicker.module.css'

const OrderPicker = ({ dishes }) => {
  return (
    <div className={css.orderPickerWrapper}>
      {dishes.map(dish => (
        <Dish dish={dish} />
      ))}
    </div>
  )
}

export default OrderPicker
