package no.systek.graphqlworkshop.clients;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.net.URI;
import java.util.Collection;
import java.util.Collections;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.springframework.stereotype.Component;

@Component
public class AllergensClient {
  private static String ALLERGENS_BY_INGREDIENT_QUERY = "query GetAllergensForIngredient($ingredient: String!) { allergens(ingredient: $ingredient)}";

  private ObjectMapper objectMapper = new ObjectMapper();

  public Collection<String> getAllergens(String ingredient) {
    URI uri;
    try (CloseableHttpClient client = HttpClients.createDefault()) {
      uri = new URIBuilder("https://allergens.gql.systek.dev/price").build();
      HttpPost httpPost = new HttpPost(uri);

      StringEntity stringEntity =
          new StringEntity(
              "{"
                  + "\"operationName\": \"GetAllergensForIngredient\","
                  + "\"query\": \"" + ALLERGENS_BY_INGREDIENT_QUERY + "\","
                  + "\"variables\": { \"ingredient\": \"" + ingredient.toLowerCase() + "\"}"
                  + "}",
              ContentType.APPLICATION_JSON);

      httpPost.setEntity(stringEntity);
      httpPost.setHeader("Content-Type", "application/json");

      CloseableHttpResponse response = client.execute(httpPost);

      AllergensResponse allergensResponse =
          objectMapper.readValue(response.getEntity().getContent(), AllergensResponse.class);
      return allergensResponse.getData().getAllergens();
    } catch (Exception e) {
      e.printStackTrace();
      return Collections.emptyList();
    }
  }
}
