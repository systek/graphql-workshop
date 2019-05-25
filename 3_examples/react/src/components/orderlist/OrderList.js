import React from 'react'
import { Query } from 'react-apollo'

import Card from '../shared/card/Card'
import { ORDERS } from '../../apollo/queries'
import Spinner from '../shared/spinner/Spinner'
import Error from '../shared/error/Error'

import { OrderItem } from './orderitem/OrderItem'
import css from './OrderList.module.css'

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
    <Query query={ORDERS} notifyOnNetworkStatusChange>
      {({ loading, error, data, ...lol }) => {
        if (error) return <Error error={error} />
        if (loading) return <Spinner fullscreen />

        console.log('orderlistbois', lol)

        const undelivered = data.orders.filter(order => order.delivered == null)
        const delivered = data.orders.filter(order => order.delivered != null)

        return (
          <>
            <Orders title="Undelivered" orders={undelivered} />
            <Orders
              title="Finished deliveries"
              orders={delivered}
              collapsedByDefault
            />
          </>
        )
      }}
    </Query>
  </Card>
)

export default OrderList
