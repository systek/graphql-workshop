# Frontend workshop

Let's learn how to consume a GraphQL API!

We will be using [Apollo](https://www.apollographql.com/docs/react/) with React for this workshop.

In this workshop you will touch on:

- Loading data
- Mutating data
- Updating the apollo-cache manually
- Using optimistic responses for better user experience
- Configuring the apollo-client with middleware

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

Visit the node backends _GraphQL Playground_, it is a small built in web app to explore a GraphQL schema. It has auto complete and a query formatter.

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

## 3. Mutating data
