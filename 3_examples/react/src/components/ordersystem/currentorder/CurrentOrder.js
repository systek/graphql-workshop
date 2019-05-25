import React from 'react'
import cn from 'classnames'
import { Mutation } from 'react-apollo'

import { ORDERS } from '../../../apollo/queries'
import { SUBMIT_ORDER } from '../../../apollo/mutations'

import CurrentOrdersList from './currentorderlist/CurrentOrderList'
import css from './CurrentOrder.module.css'

const USE_CACHE_UPDATE = false

const SubmitOrderButton = ({ orders, clearOrderCart }) => (
  <Mutation mutation={SUBMIT_ORDER} refetchQueries={[{ query: ORDERS }]}>
    {mutation => {
      const selectedDishes = Object.values(orders).map(order => ({
        dishId: order.dish.id,
        quantity: order.count,
      }))

      const submit = () => {
        mutation({
          optimisticResponse: {
            order: {
              delivered: null,
              delivery: '2019-05-25T15:14:49.788Z',
              id: '0.05335812229964887',
              __typename: 'Receipt',
            },
          },
          update: proxy => {
            if (!USE_CACHE_UPDATE) return

            const ordersCache = proxy.readQuery({ query: ORDERS })

            ordersCache.orders.push({
              __typename: 'Receipt',
              id: `temporary-id-${Object.keys(orders).join('-')}`,
              delivery: new Date().toISOString(),
              delivered: null,
              items: Object.values(orders).map(order => order.dish),
            })

            proxy.writeQuery({ query: ORDERS, data: ordersCache })
          },
          variables: {
            dishes: selectedDishes,
          },
        }).then(() => {
          clearOrderCart()
        })
      }

      return (
        <button
          className={css.submitButton}
          disabled={selectedDishes.length === 0}
          onClick={submit}
        >
          Submit order
        </button>
      )
    }}
  </Mutation>
)

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
