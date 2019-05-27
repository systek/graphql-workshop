# Frontend workshop

Let's learn how to consume a GraphQL API!

We will be using [Apollo](https://www.apollographql.com/docs/react/) with React for this workshop.

In this workshop you will touch on:

1. (Setting up for development towards local backend)
2. Loading data
3. Mutating data
4. Updating the apollo-cache manually
5. Using optimistic responses for better user experience
6. Configuring the apollo-client with middleware

## 1. Setup

In the `1_starter/react` folder, run `yarn` to install dependencies and run `yarn start` to start the create-react-app development build.

Verify that everything looks fine, and that the example query loads the data as expected.

Developing against the deployed example won't be the best experience as other people might add and remove data at any time. We would like to use a local node example as a development backend instead. The `apollo.js` file is where the URL the Apollo client uses is configured, change it to just `/`.

```diff
const client = new ApolloClient({
-  uri: "https://node.gql.systek.dev/"
+  uri: "/"
});
```

Now run `yarn` and `yarn start` in the `3_examples/node` folder and you should have a backend running.

Together with the `proxy` configuration already present in `1_starter/react/package.json` this will proxy any request from the React application to the backend.

_Before continuing you might want to familiarise your self with the folder structure and example components._

## 2. Loading data

[Apollo docs: Queries](https://www.apollographql.com/docs/react/essentials/queries)

In GraphQL, fetching data (without changing it) is called queries. With Apollo fetching data is done using a `<Query />` component. This component expects a `query` prop which is a GraphQL query.

**Optional: Familiarize your self with GraphQL queries!**

Visit the node backends _GraphQL Playground_, (http://localhost:4000/) it is a small built in web app to explore a GraphQL schema. It has auto complete and a query formatter.

Try pasting in this query and hitting play:

```graphql
{
  ingredients {
    id
    name
  }
}
```

Now head over to the `1_starter/react/src/example/Example.js` component and look at how a query is used together with the query component. The query parsed by `gql` can be passed directly as a query prop to the `Query` component.

The values we are given from the `Query` component contain everything we need, from loading state to errors, even the data from the server.

```js
{
  client: Object;
  loading: false;
  data: {
    ingredients: Array(6);
  }
  error: undefined;
  fetchMore: ƒ();
  networkStatus: 7;
  refetch: ƒ();
  variables: {
  }
}
```

**Task:** Play around with the `Query` component to fetch some more data. Expand the component do display these values.

Now create a completely new component that lists out all `Orders` in the backend. Important for later!

Here is a complete query you can use:

```graphql
query AllOrders {
  orders {
    orderId
    delivery
    delivered
    items {
      id
      name
      price
    }
  }
}
```

Remember to use it with the `{ gql }` function from `apollo-boost`.

## 3. Mutating data

[Apollo docs: Mutations](https://www.apollographql.com/docs/react/essentials/mutations)

Queries are only for getting data (think HTTP GET request), to change any data we will use use a `Mutation`.

Mutations work very similar to queries, are structured the same way and can ever return objects the same as queries.

In fact, from a syntax perspective the only difference between a query and a mutation is the word mutation before the query:

```graphql
mutation {
  order(dishes: { dishId: 100, quantity: 3 }) {
    id
    delivery
  }
}
```

Mutations often take some values as parameters, the example above (that you can paste straight into GraphQL Playground (http://localhost:4000/)) have some complex parameters. In fact, it takes in a list of objects, which means you can send in just one, like above, or several.

```graphql
mutation {
  order(dishes: [{ dishId: 100, quantity: 3 }, { dishId: 101, quantity: 2 }]) {
    id
    delivery
  }
}
```

Parameters can be a lot simpler, they can be normal string, ints, floats or booleans as well.

```graphql
mutation {
  markDelivered(orderId: "0.7592086608808599")
}
```

Here the return value is a boolean, so the return body (`{}`) can be omitted.

**Task:** Create a new component, and wrap it in a `Mutation` component. The mutation component expects a `mutation` property.

Example:

```js
import React from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";

const orderDishMutation = gql`
  mutation {
    order(dishes: { dishId: 100, quantity: 3 }) {
      id
      delivery
    }
  }
`;

const OrderDishButton = () => (
  <Mutation mutation={orderDishMutation}>
    {mutation => <button onClick={submit}>Store order!</button>}
  </Mutation>
);
```

The example is pretty plain, but it becomes interesting as soon as we start passing variables from JS to GraphQL. This is not done through manual string-concatenation but through GraphQLs own variables which tie in nicely with Apollo.

```js
const orderDishMutationWithVariables = gql`
  mutation OrderDish($dishId: Int!, $count: Int!) {
    order(dishes: { dishId: $dishId, quantity: $count }) {
      id
      delivery
    }
  }
`;

const OrderDishButton = () => (
  <Mutation
    mutation={orderDishMutationWithVariables}
    variables={{
      dishId: 100,
      count: 10
    }}
  >
    {mutation => <button onClick={submit}>Store order!</button>}
  </Mutation>
);
```

You can even use complex objects if the mutation asks for it:

```js
const orderDishMutationWithVariables = gql`
  mutation OrderDish($dishList: [Order!]!) {
    order(dishes: $dishList) {
      id
      delivery
    }
  }
`;

const OrderDishButton = () => (
  <Mutation
    mutation={orderDishMutationWithVariables}
    variables={{
      dishList: [{ dishId: 100, quantity: 8 }, { dishId: 101, quantity: 2 }]
    }}
  >
    {mutation => <button onClick={submit}>Store order!</button>}
  </Mutation>
);
```

**Task:** Expand the mutation component to take some input from the user (input, buttons, whatever you see fit).

The syntax for parameters in mutations can also be used in queries. Often used for filtering and sorting.

## 4 Updating the apollo-cache manually

