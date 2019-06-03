import React from 'react'

import MarkDeliveredButton from './markdeliveredbutton/MarkDeliveredButton'
import css from './OrderItem.module.css'

const OrderItem = ({ order }) => (
  <div className={css.orderItem} key={order.id}>
    <div className={css.orderContent}>
      <div className={css.orderTitle}>
        Order {order.id.startsWith('temporary') ? 'pending...' : order.id}
      </div>
      <ul>
        {order.items.map(item => (
          <li key={item.name}>{item.name}</li>
        ))}
      </ul>
      <div className={css.deliveryAt}>
        Expected delivery at {new Date(order.delivery).toLocaleTimeString()}
      </div>
      {order.delivered && (
        <div className={css.deliveryAt}>
          Delivered {new Date(order.delivery).toLocaleString()}
        </div>
      )}
    </div>
    {!order.delivered && <MarkDeliveredButton order={order} />}
  </div>
)

export default OrderItem;