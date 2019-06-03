import React from 'react'
import cn from 'classnames'

import CurrentOrdersList from './currentorderlist/CurrentOrderList'
import SubmitOrderButton from './submitorderbutton/SubmitOrderButton'
import css from './CurrentOrder.module.css'

const OrderTotal = ({ orders }) => {
  const totalPrice = Object.values(orders)
    .map(order => ({
      price: order.dish.price,
      count: order.count,
    }))
    .reduce((total, order) => total + order.price * order.count, 0)

  if (!totalPrice) {
    return null
  }

  return (
    <div className={css.orderTotal}>
      <div>Total price</div>
      <div>{totalPrice}kr</div>
    </div>
  )
}

const CurrentOrder = ({ orders, className, clear }) => (
  <div className={cn(css.currentOrderWrapper, className)}>
    <CurrentOrdersList orders={Object.values(orders)} />
    <OrderTotal orders={orders} />
    <SubmitOrderButton orders={orders} clearOrderCart={clear} />
  </div>
)

export default CurrentOrder
