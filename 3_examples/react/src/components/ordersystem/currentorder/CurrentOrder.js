import React from 'react'
import cn from 'classnames'
import { Mutation } from 'react-apollo'

import { SUBMIT_ORDER } from '../../../apollo/mutations'

import CurrentOrdersList from './currentorderlist/CurrentOrderList'
import css from './CurrentOrder.module.css'
import { ORDERS } from '../../../apollo/queries'

const SubmitOrderButton = ({ orders }) => (
  <Mutation mutation={SUBMIT_ORDER} refetchQueries={[{ query: ORDERS }]}>
    {mutation => {
      const selectedDishes = Object.values(orders).map(order => ({
        dishId: order.dish.id,
        quantity: order.count,
      }))

      const submit = () => {
        mutation({
          variables: {
            dishes: selectedDishes,
          },
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

const CurrentOrder = ({ orders, className }) => (
  <div className={cn(css.currentOrderWrapper, className)}>
    <CurrentOrdersList orders={Object.values(orders)} />
    <OrderTotal orders={orders} />
    <SubmitOrderButton orders={orders} />
  </div>
)

export default CurrentOrder
