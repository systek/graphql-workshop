import React from 'react'
import { Mutation } from 'react-apollo'

import { MARK_DELIVERED } from '../../../apollo/mutations'
import { ORDERS } from '../../../apollo/queries'

import css from './OrderItem.module.css'

const MarkDeliveredButton = ({ orderId }) => (
  <Mutation mutation={MARK_DELIVERED} refetchQueries={[{ query: ORDERS }]}>
    {mutate => {
      const submit = () => {
        mutate({ variables: { orderId } })
      }

      return <button onClick={submit}>Mark delivered</button>
    }}
  </Mutation>
)
export const OrderItem = ({ order }) => (
  <div className={css.orderItem} key={order.orderId}>
    <div className={css.orderContent}>
      <div className={css.orderTitle}>Order {order.orderId.slice(-6)}</div>
      <ul>
        {order.items.map(item => (
          <li>{item.name}</li>
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
    {!order.delivered && <MarkDeliveredButton orderId={order.orderId} />}
  </div>
)
