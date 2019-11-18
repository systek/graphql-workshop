import React from 'react'
import cn from 'classnames'
import { useQuery } from '@apollo/react-hooks'

import { DISHES } from '../../../apollo/queries'
import Error from '../../shared/error/Error'
import Spinner from '../../shared/spinner/Spinner'

import Dish from './dish/Dish'
import css from './OrderPicker.module.css'

const OrderPickerContent = ({ add }) => {
  const { error, loading, data } = useQuery(DISHES)

  if (error) {
    return <Error error={error} />
  }

  if (loading) {
    return <Spinner fullscreen />
  }

  return (
    <div className={css.orderPickerContent}>
      {data.dishes.map(dish => (
        <Dish key={dish.id} dish={dish} add={add} />
      ))}
    </div>
  )
}

const OrderPicker = ({ add, className }) => (
  <div className={cn(css.orderPickerWrapper, className)}>
    <OrderPickerContent add={add} />
  </div>
)

export default OrderPicker
