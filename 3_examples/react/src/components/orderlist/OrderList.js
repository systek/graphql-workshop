import React from 'react'
import { useQuery } from '@apollo/react-hooks'

import { ORDERS } from '../../apollo/queries'
import Card from '../shared/card/Card'
import Spinner from '../shared/spinner/Spinner'
import Error from '../shared/error/Error'

import OrderItem from './orderitem/OrderItem'
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
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  )
}

const OrderList = () => {
  const { error, loading, data } = useQuery(ORDERS)

  console.log("Mornin")

  if (error) return <Error error={error} />
  if (loading) return <Spinner fullscreen />

  const undelivered = data.orders.filter(order => order.delivered == null)
  const delivered = data.orders.filter(order => order.delivered != null)

  console.log(undelivered, delivered)

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
}

const OrderListSection = () => (
  <Card className={css.orderListContainer}>
    <h2>Deliveries</h2>
    <OrderList />
  </Card>
)

export default OrderListSection
