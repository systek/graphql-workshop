# Java starter

This starter uses:

- Spring Boot as application server
- graphql-spring-boot-starter and graphiql-spring-boot-starter for automatic configuration of graphql runtime
- graphql-java-tools for schema first development

## Points of interest

- [application.yml](/1_starter/java//src/main/resources/application.yml)
  - coniguration of graphql servlet and graphiql console
- [schema.graphqls](/1_starter/java//src/main/resources/schema.graphqls)
  - GraphQL schema definition
- [AllergensClient.java](/3_examples/java/src/main/java/no/systek/graphqlworkshop/clients/AllergensClient.java)
  - Client for communicating with allergens REST API. Perfect for stealing if you don't want to implement this your self!
- [MarketPriceClient.java](/3_examples/java/src/main/java/no/systek/graphqlworkshop/clients/MarketPriceClient.java)
  - Client for communicating with marketPrice GraphQL API. Perfect for stealing if you don't want to implement this your self!
- [DataSource.java](/3_examples/java/src/main/java/no/systek/graphqlworkshop/storage/DataSource.java)
  - Simple in memory fake datastore that has ingredients, dishes and orders
- [schema.graphqls](/3_examples/java/src/main/resources/schema.graphqls)
  - GraphQL schema
