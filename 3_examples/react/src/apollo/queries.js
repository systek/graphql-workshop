import gql from "graphql-tag";

export const ORDERS = gql`
  query Orders {
    orders {
      orderId
      delivery
      items {
        id
        name
        price
      }
    }
  }
`;
