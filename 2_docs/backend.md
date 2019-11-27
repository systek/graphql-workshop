
# Backend workshop

Let's learn how to build a GraphQL API!

We will be using [graphql-java-kickstart](https://github.com/graphql-java-kickstart) for both the java and kotlin implementation and [apollo-server](https://www.apollographql.com/docs/apollo-server/) for the node example.

In the workshop you will touch on:
1. Playground - An in-browser IDE for exploring GraphQL
1. QueryResolver - Root queries for your application
1. Resolver - Field resolver
1. Integrating with an external REST API - [Marked price of food items](https://market.gql.systek.dev/) 
    - Documentation: Use spectacle docs at root of URL
1. Integrating with an external GraphQL API - [Allergens of food items](https://allergens.gql.systek.dev/) 
    - Documentation: Use GraphiQL at root of URL

If you are stuck at any point, feel free to peek into the [full node example](/3_examples/node), [full java example](/3_examples/java) or [full kotlin example](/3_examples/kotlin).

## 1. Setup

We are making a food ordering app! Feel free to stray for this path, but the completed examples are all the same, and they work towards this.
1. Clone [this](https://github.com/systek/graphql-workshop) repository
1. Navigate to 1_starter/[node|java|kotlin]
1. Build the application
    - Node: yarn
    - Java/Kotlin: ./gradlew
1. Run the application
    - Node: yarn start
    - Java/Kotlin: ./gradlew bootRun
1. Navigate to Playground
    - Node: http://localhost:4000/
    - Java/Kotlin: http://localhost:8080/api/playground
1. Observe the response from the following query: 
``` 
query { 
  developers { 
    name
  }
}
```

## 2. Explore the API through playground
1. Use the query navigator to identify the fields that can be added to the query
1. Add the fields and explore the result
1. Navigate to https://node.gql.systek.dev/, this is complete and working example of the api we are going to build. We will use this as a reference point in the remainder of the workshop.


## 3. Build your schema
Start with one query, and build the type objects as you need them. We will start each section with the query illustrating the new functionality being added.
- For Java and Kotlin, the schema definition can be found in `main/resources/schema.graphqls`
- For node, the schema is defined in the constant `typeDefs` in `index.js` 

### Query: Get all dishes
```
query {
  dishes{
    id
    name
    ingredients {
      id
      name
    }
  }
}
```
1. Add a Ingredient type to your schema
    - id: number - unique id
    - name: String
1. Add a Dish type in your schema
    - id: number - unique id
    - name: String
    - ingredients: Collection of Ingredients
1. Build a query called `dishes` that returns a list of all available dishes as `Dish`-objects that adheres to the above query.
1. Create a fake datasource (or real!), put some `Dish`-objects and `Ingredient`-objects into it. 
1. Create a query resolver that connects the query to the datasource

### Query: Get dish by dishId
```
query {
  dish(dishId: 101) {
    id
    name
    ingredients {
      id
      name
    }
  }
}
```

1. Create a new query, call it `dish`, make it receive a single required parameter that is the dish's ID.
1. Create a new query resolver that connects the query to a filter that extracts the dish identified by the id.
1. The query should return the dish, or null if not found.

### Query: Get all current orders
```
query {
  orders {
    id
    delivery
    delivered
    items {
      id
      name
      ingredients {
        id
        name
      }
    }
  }
}
```

1. Add a `Receipt` definition to your schema
    - id: number
    - delivery: String - date/time of expected delivery
    - delivered: nullable String - date/time of delivery
    - items: collection of `Dish` items
1. Add a orders query to your schema that takes no parameters and returns a list of `Receipt`'s
1. Store receipts in your system.
1. Upgrade the fake datasource to contain these, or steal the one from the example projects if you want. 
1. This query should return all receipts in the system.

### Mutation: Place an order, one or many

```
mutation {
  order(dishes: [{ dishId: 101, quantity: 1 }]) {
    id
    delivery
    delivered
    items {
      id
      name
      ingredients {
        id
        name
      }
    }
  }
}
```

1. Add a `Order` definition to your schema
    - dishId: number
    - quantity: number
1. Create a mutation, call it `order`, receive an array of `Order` items.
1. Create a mutation resolver for the new mutation
1. Store the order in the system (you might need to extend your datasource).
1. Return a `Receipt` to the user.

## 4. External integrations!

You now probably have all your domain objects, let us extend them with some object-resolvers, and talk to some external APIs.

Create a `marketPrice` of type float on your `Ingredient`-object. Look at the resources section above, look at the API and create a HTTP client that communicates with this API. Make it available through the object resolver.

Next, create a `allergens` of which can be a list of strings. Create a HTTP client that communicates with this external GraphQL API.

Extra curricular activity: Find a library that is a GraphQL client for your platform, is it easier to use? Better? REST 4 lyfe?

### Back to queries: List all ingredients, supply a way to sort through params!

1. Create a query called `ingredients`, with no params. It should just return a list of all ingredients in the database.
1. Create a enum type, add it as an optional parameter to `ingredients`. When passed in you can sort the result differently. Make sure you parse the enum correctly.
    - NAME: sort by name
    - PRICE: sort by price
    
## 5. Summary
### Objects

There are four main domain objects, `Dish`, `Ingredient`, `Order` and `Receipt`.

#### `Receipt`

A receipt has an orderId which is a unique string, a delivery which is a timestamp (represented a a ISO-8601 formatted). It also resolves a list of `Ingredient` based on it's own orderId.

#### `Order`

A order is a object that is only used as an input to mutations, this object has a dishId and a quantity, both integers.

#### `Dish`

Dish has an integer ID, a name, a price. It should also be extended to resolve a list of `Ingredient` objects based on it's name.

#### `Ingredient`

Ingredient has an integer ID and a name. It shall also be extended to have two externally resolvable variables. "Market price" and "allergens" (which is a list). The shape of these objects you can chose your self, based on what the API provides.

## End

If you managed to get this far, good job! Want an extra challenge? Try enabling batch fetching of orders through the use of [DataLoaders](https://github.com/graphql/dataloader). The price and ingredients services provide separate endpoints/resolvers for batched fetching of data. 
