# Kotlin starter

This starter uses:

- Spring Boot as application server
- graphql-spring-boot-starter and graphiql-spring-boot-starter for automatic configuration of graphql runtime
- graphql-java-tools for schema first development

## Points of interest

- [application.yml](/1_starter/kotlin/src/main/resources/application.yml)
  - coniguration of graphql servlet and graphiql console
- [schema.graphqls](/1_starter/kotlin/src/main/resources/schema.graphqls)
  - GraphQL schema definition
- [AllergensClient.kt](/2_examples/kotlin/src/main/kotlin/no/systek/graphqlworkshop/clients/AllergensClient.kt)
  - Client for communicating with allergens REST API. Perfect for stealing if you don't want to implement this your self!
- [MarketPriceClient.kt](/2_examples/kotlin/src/main/kotlin/no/systek/graphqlworkshop/clients/MarketPriceClient.kt)
  - Client for communicating with marketPrice GraphQL API. Perfect for stealing if you don't want to implement this your self!
- [DataSource.kt](/2_examples/kotlin/src/main/kotlin/no/systek/graphqlworkshop/storage/DataSource.kt)
  - Simple in memory fake datastore that has ingredients, dishes and orders
- [schema.graphqls](/2_examples/kotlin/src/main/resources/rootSchema.graphqls)
  - GraphQL schema
