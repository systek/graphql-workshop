import gql from 'graphql-tag'

export const SUBMIT_ORDER = gql`
  mutation SubmitOrder($dishes: [Order!]!) {
    order(dishes: $dishes) {
      orderId
    }
  }
`
