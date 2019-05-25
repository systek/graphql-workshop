import gql from 'graphql-tag'

export const SUBMIT_ORDER = gql`
  mutation SubmitOrder($dishes: [Order!]!) {
    order(dishes: $dishes) {
      orderId
    }
  }
`

export const MARK_DELIVERED = gql`
  mutation MarkOrderDelivered($orderId: String!) {
    markDelivered(orderId: $orderId)
  }
`
