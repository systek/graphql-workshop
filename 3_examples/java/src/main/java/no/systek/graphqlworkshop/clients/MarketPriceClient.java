package no.systek.graphqlworkshop.clients;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

@Component
public class MarketPriceClient {

  private WebClient client = WebClient.create("https://market.gql.systek.dev/price");

  public double getMarketPrice(String ingredient) {
    MarketPriceResponse marketPriceResponse = client.get()
        .uri(uriBuilder ->
            uriBuilder.queryParam("ingredient", ingredient.toLowerCase()).build())
        .accept(MediaType.APPLICATION_JSON)
        .retrieve()
        .bodyToMono(MarketPriceResponse.class)
        .block();

    return marketPriceResponse == null ? -1 : marketPriceResponse.getPrice();
  }
}
