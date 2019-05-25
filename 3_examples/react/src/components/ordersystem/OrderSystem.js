import React from 'react'

import Card from '../shared/card/Card'
import Error from '../shared/error/Error'

import CurrentOrder from './currentorder/CurrentOrder'
import OrderPicker from './orderpicker/OrderPicker'
import css from './OrderSystem.module.css'

const orderReducer = (state, action) => {
  switch (action.type) {
    case 'add': {
      return {
        ...state,
        [action.payload.dish.id]: action.payload,
      }
    }
    case 'remove': {
      const newState = {
        ...state,
      }
      delete newState[action.payload.id]

      return newState
    }
    case 'clear': {
      return {}
    }
    default:
      throw new Error('Invalid action')
  }
}

const OrderSystem = () => {
  const [orders, dispatch] = React.useReducer(orderReducer, {})

  const addOrder = React.useCallback(order => {
    dispatch({ type: 'add', payload: order })
  }, [])

  const clearOrder = React.useCallback(() => {
    dispatch({ type: 'clear' })
  }, [])

  return (
    <Card className={css.orderSystemContainer}>
      <div className={css.content}>
        <h2>New orders</h2>
        <OrderPicker className={css.picker} add={addOrder} />
        <CurrentOrder orders={orders} clear={clearOrder} />
      </div>
    </Card>
  )
}

export default OrderSystem
