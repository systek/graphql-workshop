package no.systek.graphqlworkshop.clients;

import java.util.Collection;
import java.util.Collections;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

@Component
public class AllergensClient {

  private static String ALLERGENS_BY_INGREDIENT_QUERY = "query GetAllergensForIngredient($ingredient: String!) { allergens(ingredient: $ingredient)}";

  private WebClient client = WebClient.create("https://allergens.gql.systek.dev/price");

  public Collection<String> getAllergens(String ingredient) {

    String body = "{"
        + "\"operationName\": \"GetAllergensForIngredient\","
        + "\"query\": \"" + ALLERGENS_BY_INGREDIENT_QUERY + "\","
        + "\"variables\": { \"ingredient\": \"" + ingredient.toLowerCase() + "\"}"
        + "}";

    AllergensResponse allergensResponse = client.post()
        .header("Content-Type", "application/json")
        .body(BodyInserters.fromObject(body))
        .retrieve()
        .bodyToMono(AllergensResponse.class)
        .block();

    return allergensResponse == null ? Collections.emptyList() : allergensResponse.getData().getAllergens();
  }
}
