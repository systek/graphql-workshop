import React from 'react'
import { Query } from 'react-apollo'

import { DISHES } from '../../apollo/queries'
import Spinner from '../spinner/Spinner'
import Card from '../card/Card'

import OrderPicker from './orderpicker/OrderPicker'
import css from './OrderSystem.module.css'
import Error from '../error/Error'

const OrderSystem = () => (
  <Card className={css.orderSystemContainer}>
    <div className={css.content}>
      <h3>New orders</h3>
      <Query query={DISHES}>
        {({ data, loading, error }) => {
          if (error) {
            return <Error error={error} />
          }

          if (loading) {
            return <Spinner fullscreen />
          }

          return <OrderPicker dishes={data.dishes} />
        }}
      </Query>
    </div>
  </Card>
)

export default OrderSystem
