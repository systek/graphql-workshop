package no.systek.graphqlworkshop.clients;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AllergensResponse {
  private AllergensData data;

  public AllergensResponse() {}
}
