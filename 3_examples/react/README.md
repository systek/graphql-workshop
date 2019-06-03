# react example

This starter uses:

- create-react-app for simple React config
- apollo-boost for simple apollo setup

## Points of interest

- [apollo/client.js](/3_examples/react/src/apollo/client.js)
  - configuration of apollo client
- [App.js](/3_examples/react/src/components/App.js)
  - root component that has `ApolloProvider` with client
- [Cart.js](/3_examples/react/src/components/header/stats/Stats.js)
  - simple component that queries number of orders and displays them as a number
- [OrderList.js](/3_examples/react/src/components/orderlist/OrderList.js)
  - component that queries all orders and displays them as lists
- [OrderList.js](/3_examples/react/src/components/orderlist/OrderList.js)
  - component that queries all orders and displays them as lists
- [MarkDeliveredButton.js](/3_examples/react/src/components/orderlist/orderitem/markdeliveredbutton/MarkDeliveredButton.js)
  - component that uses mutation to save new orders, uses optimistic response
- [SubmitOrderButton.js](/3_examples/react/src/components/ordersystem/currentorder/submitorderbutton/SubmitOrderButton.js)
  - component that uses mutation to save new orders, uses manual cache update and optimistic response
