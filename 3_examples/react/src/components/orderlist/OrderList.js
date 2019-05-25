import React from 'react'
import { Query } from 'react-apollo'

import Card from '../shared/card/Card'

import { ORDERS } from '../../apollo/queries'
import Spinner from '../shared/spinner/Spinner'
import Error from '../shared/error/Error'

import css from './OrderList.module.css'

const ListLoading = () => (
  <div className={css.listLoading}>
    <Spinner />
  </div>
)

const OrderItem = ({ order }) => (
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
    </div>
    <button>Mark delivered</button>
  </div>
)

const byDelivery = (a, b) => b.delivery.localeCompare(a.delivery)

const Orders = ({ title, orders, collapsedByDefault }) => {
  const [collapsed, setCollapsed] = React.useState(collapsedByDefault || false)

  return (
    <div>
      <button
        className={css.headerButton}
        onClick={() => setCollapsed(c => !c)}
      >
        <h3>
          {title} ({orders.length}) {collapsed ? '▲' : '▼'}
        </h3>
      </button>
      {!collapsed && (
        <div>
          {orders.sort(byDelivery).map(order => (
            <OrderItem order={order} />
          ))}
        </div>
      )}
    </div>
  )
}

const OrderList = () => (
  <Card className={css.orderListContainer}>
    <h2>Deliveries</h2>
    <Query query={ORDERS}>
      {({ loading, error, data }) => {
        if (error) return <Error error={error} />
        if (loading) return <ListLoading />

        return (
          <>
            <Orders title="Undelivered" orders={data.orders} />
            <Orders
              title="Finished deliveries"
              orders={data.orders}
              collapsedByDefault
            />
          </>
        )
      }}
    </Query>
  </Card>
)

export default OrderList
