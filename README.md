# graphql workshop

## Choose one

### [node](/1_starter/node) | [java](/1_starter/java) | [kotlin](/1_starter/kotlin) | [.net core](/1_starter/core)

Follow the workshop

### Resources during the workshop:

APIs than you will integrate with:

Marked price of food items:

https://market.gql.systek.dev/

REST API, documentation: Use spectacle docs at root of URL.

Allergens of food items:

https://allergens.gql.systek.dev/

GraphQL API, documentation: Use GraphiQL at root of URL.

## What are you making?

A food ordering app!

Feel free to stray for this path, but the completed examples are all the same, and they work towards this.

Suggestions for order of implementation below, domain object descriptions are found in the next section.

### Build a schema step by step

Start with one query, and build the type objects as you need them.

#### Get all dishes available

Create a fake datasource (or real!), put some example data into it. Build a query called `dishes` that returns a list of all available dishes as `Dish`-objects.

#### Get specific dish by dishId

Create a query, call it `dish`, make it receive a single required parameter that is the dish's ID. Return that dish or null if not found.

#### Get all current orders

Store orders in your system! Upgrade the fake datasource to contain these, or steal the one from the example projects if you want. This query should take no params and return all receipts in the system.

#### Mutation: Place an order, one or many

Create a mutation, call it `order`, define an input object and receive an array of these. Store the order in the system (you might need to extend your datasource). Return a receipt to the user!

#### Back to queries: List all ingredients, supply a way to sort through params!

Create a query called `ingredients`, with no params it should just return a list of all ingredients in the database.

Create a enum type, make it a parameter (but optional?). When passed it you can sort the result differently. Make sure you parse the enum correcly.

#### External integrations!

You now probably have all your domain objects, let us extend them with some object-resolvers, and talk to some external APIs.

Create a `marketPrice` of type float on your `Ingredient`-object. Look at the resources section above, look at the API and create a HTTP client that communicates with this API. Make it available through the object resolver.

Next, create a `allergens` of which can be a list of strings. Create a HTTP client that communicates with this external GraphQL API.

Extra corricular activity: Find a library that is a GraphQL client for your platform, is it easier to use? Better? REST 4 lyfe?

### Objects

There are four main domain objects, `Dish`, `Ingredient`, `Order` and `Receipt`.

#### `Receipt`

A receipt has an orderId which is a unqiue string, a delivery which is a timestamp (represented a a ISO-8601 formatted). It also resolves a list of `Ingredient` based on it's own orderId.

#### `Order`

A order is a object that is only used as an input to mutations, this object has a dishId and a quantity, both integers.

#### `Dish`

Dish has an integer ID, a name, a price. It should also be extended to resolve a list of `Ingredient` objects based on it's name.

#### `Ingredient`

Ingredient has an integer ID and a name. It shall also be extended to have two externally resolveable variables. "Market price" and "allergens" (which is a list). The shape of these objects you can chose your self, based on what the API provides.

## Stuck or done? Look at the completed examples

### [node](/2_examples/node) | [java](/2_examples/java) | [kotlin](/2_examples/kotlin) | [.net core](/2_examples/core)

Other resources:

- Intro presentation slides: https://presentation.gql.systek.dev/
- GraphiQL of completed Node example: https://node.gql.systek.dev/
