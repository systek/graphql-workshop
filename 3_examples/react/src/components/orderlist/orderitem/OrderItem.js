import React from 'react'
import { Mutation } from 'react-apollo'

import { FlagsContext } from '../../../context/DemoFlags'
import { MARK_DELIVERED } from '../../../apollo/mutations'

import css from './OrderItem.module.css'

const MarkDeliveredButton = ({ order }) => {
  const flags = React.useContext(FlagsContext)

  return (
    <Mutation mutation={MARK_DELIVERED}>
      {mutate => {
        const submit = () => {
          mutate({
            optimisticResponse: flags.useOptimisticResponse
              ? {
                  markDelivered: {
                    ...order,
                    delivered: new Date().toISOString(),
                  },
                }
              : undefined,
            variables: { orderId: order.id },
          })
        }

        return <button onClick={submit}>Mark delivered</button>
      }}
    </Mutation>
  )
}

export const OrderItem = ({ order }) => (
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
