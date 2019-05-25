import React from 'react'
import { Query } from 'react-apollo'

import { ORDERS } from '../../../apollo/queries'
import Spinner from '../../shared/spinner/Spinner'
import Error from '../../shared/error/Error'

import css from './Stats.module.css'

const Stats = () => (
  <div className={css.stats}>
    <Query query={ORDERS}>
      {({ data, loading, error }) => {
        if (error) {
          return <Error error={error} smoll />
        }

        if (loading) {
          return <Spinner smoll />
        }

        const orders = data.orders.length

        return (
          <div className={css.counter}>
            <div>{orders === 0 ? 'No' : orders}</div>
            <div>{orders === 1 ? 'order' : 'orders'}</div>
          </div>
        )
      }}
    </Query>
  </div>
)

export default Stats
