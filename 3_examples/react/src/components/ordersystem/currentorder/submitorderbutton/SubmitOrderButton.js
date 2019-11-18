import React from 'react'
import { useMutation } from '@apollo/react-hooks'

import { FlagsContext } from '../../../../context/DemoFlags'
import { ORDERS } from '../../../../apollo/queries'
import { SUBMIT_ORDER } from '../../../../apollo/mutations'

import css from './SubmitOrderButton.module.css'

const SubmitOrderButton = ({ orders, clearOrderCart }) => {
  const flags = React.useContext(FlagsContext)
  const [mutate] = useMutation(SUBMIT_ORDER, {
    refetchQueries: !flags.useCacheUpdate ? [{ query: ORDERS }] : [],
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
      console.log(flags)
      if (!flags.useCacheUpdate) return

      const ordersCache = proxy.readQuery({ query: ORDERS })

      console.log(ordersCache)
      console.log(data)

      const updatedData = {
        ...ordersCache,
        orders: [...ordersCache.orders, data.order],
      }

      proxy.writeQuery({
        query: ORDERS,
        data: updatedData,
      })
    },
  })

  const selectedDishes = React.useMemo(
    () =>
      Object.values(orders).map(order => ({
        dishId: order.dish.id,
        quantity: order.count,
      })),
    [orders],
  )
  const submit = React.useCallback(async () => {
    await mutate({
      variables: {
        dishes: selectedDishes,
      },
    }).then(() => {
      clearOrderCart()
    })
  }, [mutate, clearOrderCart, selectedDishes])

  return (
    <button
      className={css.submitButton}
      disabled={selectedDishes.length === 0}
      onClick={submit}
    >
      Submit order
    </button>
  )
}

export default SubmitOrderButton
