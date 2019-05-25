import gql from 'graphql-tag'

export const SUBMIT_ORDER = gql`
  mutation SubmitOrder($dishes: [Order!]!) {
    order(dishes: $dishes) {
      id
      delivery
      delivered
    }
  }
`

export const MARK_DELIVERED = gql`
  mutation MarkOrderDelivered($orderId: String!) {
    markDelivered(orderId: $orderId) {
      id
      delivery
      delivered
      items {
        id
        name
        price
      }
    }
  }
`
