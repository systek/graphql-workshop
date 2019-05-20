package no.systek.graphqlworkshop.clients;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.net.URI;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.springframework.stereotype.Component;

@Component
public class MarketPriceClient {
  private ObjectMapper objectMapper = new ObjectMapper();

  public double getMarketPrice(String ingredient) {

    URI uri;
    try (CloseableHttpClient client = HttpClients.createDefault()) {
      uri =
          new URIBuilder("https://market.gql.systek.dev/price")
              .addParameter("ingredient", ingredient.toLowerCase())
              .build();

      HttpResponse response = client.execute(new HttpGet(uri));
      MarketPriceResponse marketPriceResponse =
          objectMapper.readValue(response.getEntity().getContent(), MarketPriceResponse.class);

      return marketPriceResponse.getPrice();
    } catch (Exception e) {
      e.printStackTrace();
      return -1;
    }
  }
}
