package no.systek.graphqlworkshop.clients;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MarketPriceResponse {
  private String name;
  private float price;

  public MarketPriceResponse() {}
}
