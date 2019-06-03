import React from 'react'
import { Mutation } from 'react-apollo'

import { FlagsContext } from '../../../../context/DemoFlags'
import { ORDERS } from '../../../../apollo/queries'
import { SUBMIT_ORDER } from '../../../../apollo/mutations'

import css from './SubmitOrderButton.module.css'

const SubmitOrderButton = ({ orders, clearOrderCart }) => {
  const flags = React.useContext(FlagsContext)

  return (
    <Mutation
      mutation={SUBMIT_ORDER}
      refetchQueries={!flags.useCacheUpdate ? [{ query: ORDERS }] : []}
    >
      {mutation => {
        const selectedDishes = Object.values(orders).map(order => ({
          dishId: order.dish.id,
          quantity: order.count,
        }))

        const submit = () => {
          mutation({
            optimisticResponse: flags.useCacheUpdateAndOptimistic
              ? {
                  order: {
                    __typename: 'Receipt',
                    id: `temporary-id-${Object.keys(orders).join('-')}`,
                    delivery: new Date().toISOString(),
                    delivered: null,
                    items: Object.values(orders).map(order => order.dish),
                  },
                }
              : undefined,
            update: (proxy, { data }) => {
              if (!flags.useCacheUpdate) return

              const ordersCache = proxy.readQuery({ query: ORDERS })

              ordersCache.orders.push(data.order)

              proxy.writeQuery({
                query: ORDERS,
                data: ordersCache,
              })
            },
            variables: {
              dishes: selectedDishes,
            },
          }).then(() => {
            clearOrderCart()
          })
        }

        return (
          <button
            className={css.submitButton}
            disabled={selectedDishes.length === 0}
            onClick={submit}
          >
            Submit order
          </button>
        )
      }}
    </Mutation>
  )
}

export default SubmitOrderButton
