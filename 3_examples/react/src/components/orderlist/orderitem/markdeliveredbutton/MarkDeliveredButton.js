import React from 'react'
import { Mutation } from 'react-apollo'

import { FlagsContext } from '../../../../context/DemoFlags'
import { MARK_DELIVERED } from '../../../../apollo/mutations'

const MarkDeliveredButton = ({ order }) => {
  const flags = React.useContext(FlagsContext)

  return (
    <Mutation mutation={MARK_DELIVERED}>
      {mutate => {
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
            variables: { orderId: order.id },
          })
        }

        return <button onClick={submit}>Mark delivered</button>
      }}
    </Mutation>
  )
}

export default MarkDeliveredButton;