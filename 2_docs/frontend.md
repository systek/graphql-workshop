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

Everything fetched and updated through the apollo client is stored in an apollo cache.

So far we have created a component that lists out all orders in the system, as well as a button that can add new orders. If you add a few orders, you can see that they show up in your list component if you refresh the page.

To make them show up on the list automatically, there are a couple of things we can do. First, the easiest one is to simply tell apollo to fetch the `Orders` query once more after the mutation has completed, this can very easily be achieved with `refetchQueries`.

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
    variables={{ ... }}
    refetchQueries={[{ query: ORDERS }]}
  >
    ...
  </Mutation>
);
```

Several queries can be refetched. It's important to note that the combination of a query and it's variables is used as the key in the cache. Meaning that a refetch query with the wrong variables might not do what you think.

**Task:** Add a refetch query to your mutation, observe that the list is automatically (maybe a bit slowly?) updated with your new order each time.

In our case our mutation returns a complete object, the same object that is returned from the `Orders` query. In this scenario it makes sense to simply update the state manually.

```js
const orderDishMutationWithVariables = gql`
  mutation OrderDish($dishList: [Order!]!) {
    order(dishes: $dishList) {
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
`;

const OrderDishButton = () => (
  <Mutation
    mutation={orderDishMutationWithVariables}
    variables={{ ... }}
    update={(proxy, { data }) => {
      const ordersCache = proxy.readQuery({ query: ORDERS })

      ordersCache.orders.push(data.order)

      proxy.writeQuery({ query: ORDERS, data: ordersCache })
    }}
  >
    ...
  </Mutation>
);
```

It's important that the object is 100% in accordance with what the query that we are updating is expecting.

**Task:** Implement the update function for your mutation, to make sure it works disable `refetchQueries`, it will overwrite your manual cache updating.

`update` becomes _really_ powerful when you combine it with `optimisticResponse`. Optimistic response is an object that emulates what you believe the server will respond with, if you can guess this correctly (in the happy) path, you can make it seems like the mutation is instant for the user.

When you have a `optimisticResponse` and a `update`, the update function will be called **twice**. First with the shape of your `optimisticResponse` as the `{ data }` object. This cache update will then be **reverted**, and invoked again with the actual response of the server.

```js
const orderDishMutationWithVariables = gql`
  mutation OrderDish($dishList: [Order!]!) {
    order(dishes: $dishList) {
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
`;

const OrderDishButton = () => (
  <Mutation
    mutation={orderDishMutationWithVariables}
    variables={{ ... }}
    optimisticResponse={{
      order: {
        __typename: "Receipt",
        id: `temporary-id-${Object.keys(orders).join("-")}`,
        delivery: new Date().toISOString(),
        delivered: null,
        items: Object.values(orders).map(order => order.dish)
      }
    }}
    // !!!! Invoked twice, first with the data defined above
    // !!!! That first update is then reverted, then invoked
    // !!!! with the data from the response
    update={(proxy, { data }) => {
      const ordersCache = proxy.readQuery({ query: ORDERS });

      ordersCache.orders.push(data.order);

      proxy.writeQuery({ query: ORDERS, data: ordersCache });
    }}
  >
    ...
  </Mutation>
);
```

If both these updates look identical to the user, the user would be none the wiser that the request _actually_ took a long time.

Should the request fail, the cache update will be reverted and your cache will look like the mutation never was ran. This is a good point to show your user an error as to why the UI just jumped around a bit strangely.

**Discussion** Is building the UI around the happy path a good UX? When is it good to use optimistic responses and manual cache updates?

**Task:** Implement optimistic response and cache update in your new order mutation. When done, your new orders should feel instant, even if your set your chrome network throttling to "Slow 3G".
