import React from 'react'
import { Mutation } from 'react-apollo'

import { MARK_DELIVERED } from '../../../apollo/mutations'

import css from './OrderItem.module.css'

const USE_OPTIMISTIC_RESPONSE = false

const MarkDeliveredButton = ({ order }) => (
  <Mutation mutation={MARK_DELIVERED}>
    {mutate => {
      const submit = () => {
        mutate({
          optimisticResponse: USE_OPTIMISTIC_RESPONSE
            ? {
                markDelivered: {
                  ...order,
                  delivered: new Date().toISOString(),
                },
              }
            : {},
          variables: { orderId: order.id },
        })
      }

      return <button onClick={submit}>Mark delivered</button>
    }}
  </Mutation>
)
export const OrderItem = ({ order }) => (
  <div className={css.orderItem} key={order.id}>
    <div className={css.orderContent}>
      <div className={css.orderTitle}>Order {order.id.slice(-6)}</div>
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
