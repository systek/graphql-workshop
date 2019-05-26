import React from 'react'

import css from './CurrentOrderList.module.css'

const OrderItem = ({ count, dish }) => (
  <div className={css.orderItem}>
    <div className={css.orderItemCount}>{count}x</div>
    <div className={css.orderItemDetails}>
      <div>{dish.name}</div>
      <div>Total: {dish.price * count}kr</div>
    </div>
  </div>
)

const CurrentOrdersList = ({ orders }) => (
  <div className={css.ordersList}>
    {orders.length === 0 && <div className={css.noOrders}>No items</div>}
    {orders.map(order => (
      <OrderItem key={order.dish.id} count={order.count} dish={order.dish} />
    ))}
  </div>
)

export default CurrentOrdersList
