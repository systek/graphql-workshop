import React from 'react'
import { useQuery } from '@apollo/react-hooks'

import { ORDERS } from '../../../apollo/queries'
import Spinner from '../../shared/spinner/Spinner'
import Error from '../../shared/error/Error'

import css from './Stats.module.css'

const OrderStats = () => {
  const { error, loading, data } = useQuery(ORDERS)

  if (error) {
    return <Error error={error} smoll />
  }
  if (loading) {
    return <Spinner smoll />
  }

  const orders = data.orders.filter(order => !order.delivered).length
  return (
    <div className={css.counter}>
      <div>{orders === 0 ? 'No' : orders}</div>
      <div>{orders === 1 ? 'order' : 'orders'}</div>
    </div>
  )
}

const Stats = () => (
  <div className={css.stats}>
    <OrderStats />
  </div>
)

export default Stats
