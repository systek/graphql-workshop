# you've taken a wrong turn again

## Looking for the completed examples?

### [node](/2_examples/node) | [java](/2_examples/java) | [kotlin](/2_examples/kotlin) | [.net core](/2_examples/core)

## End goal

* Three integrations, local db, external REST and external GraphQL.
* Local DB:
    * Create a fake (or real) data source. Put some data into it.
    * Expose it through your own GraphQL Schema
    * Create a GraphQL mutation, change some data in the data source.

* External CRUD integration
    * Execute a HTTP request to an external API
    * Parse and expose through GraphQL schema

* External GraphQL integration
    * Execute a HTTP request to an external API
    * Parse and expose through GraphQL schema
    * Find a GraphQL client and use it instead


Rough outline of schema to work towards:

type Ingredient {
    id: Int!
    name: String!

    # Resolved from external API
    markedPrice: Float
    allergens: [Allergen!]!
}

type Dish {
    id: Int!
    name: String!
    price: Int!
    ingredients: [Ingredient!]
}

enum IngredientOrderBy {
    PRICE
    NAME
}

Query {
    dishes: [Dish!]!
    dish(dishId: Int!): Dish
    ingredients(
        orderBy: IngredientOrderBy
    ): [Ingredient!]!
}

input Order {
    dishId: Int!
    quantity: Int!
}

Mutation {
    order(dishes: [Order!]!): Dish
}