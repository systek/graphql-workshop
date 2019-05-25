import React from 'react'
import { Query } from 'react-apollo'

import Card from '../card/Card'

import { ORDERS } from '../../apollo/queries'
import Spinner from '../spinner/Spinner'

import css from './OrderList.module.css'
import Error from '../error/Error'

const ListLoading = () => (
  <div className={css.listLoading}>
    <Spinner />
  </div>
)

const Orders = ({ title, orders }) => (
  <div>
    <h4>{title}</h4>
    {orders.map(({ orderId, delivery }) => (
      <div key={orderId}>
        <p>
          {orderId}: {delivery}
        </p>
      </div>
    ))}
  </div>
)

const OrderList = () => (
  <Card className={css.orderListContainer}>
    <h3>Deliveries</h3>
    <Query query={ORDERS}>
      {({ loading, error, data }) => {
        if (error) return <Error error={error} />
        if (loading) return <ListLoading />

        return (
          <>
            <Orders title="Undelivered" orders={data.orders} />
            <Orders title="Finished deliveries" orders={data.orders} />
          </>
        )
      }}
    </Query>
  </Card>
)

export default OrderList
