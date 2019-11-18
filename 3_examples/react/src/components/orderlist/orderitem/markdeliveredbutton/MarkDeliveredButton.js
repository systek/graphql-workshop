import React from 'react'
import { useMutation } from '@apollo/react-hooks'

import { FlagsContext } from '../../../../context/DemoFlags'
import { MARK_DELIVERED } from '../../../../apollo/mutations'

const MarkDeliveredButton = ({ order }) => {
  const flags = React.useContext(FlagsContext)
  const [mutate] = useMutation(MARK_DELIVERED)

  const submit = () => {
    mutate({
      optimisticResponse: flags.useOptimisticResponse
        ? {
            markDelivered: {
              ...order,
              delivered: new Date().toISOString(),
            },
          }
        : undefined,
      variables: {
        orderId: order.id,
      },
    })
  }

  return <button onClick={submit}>Mark delivered</button>
}

export default MarkDeliveredButton
