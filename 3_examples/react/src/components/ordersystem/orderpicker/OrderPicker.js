import React from 'react'
import cn from 'classnames'
import { Query } from 'react-apollo'

import { DISHES } from '../../../apollo/queries'
import Error from '../../shared/error/Error'
import Spinner from '../../shared/spinner/Spinner'

import Dish from './dish/Dish'
import css from './OrderPicker.module.css'

const OrderPicker = ({ add, className }) => (
  <div className={cn(css.orderPickerWrapper, className)}>
    <Query query={DISHES}>
      {({ data, loading, error }) => {
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
      }}
    </Query>
  </div>
)

export default OrderPicker
