package no.systek.graphqlworkshop.clients;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class MarketPriceResponse {
  private String name;
  private float price;

  public MarketPriceResponse() {}
}
