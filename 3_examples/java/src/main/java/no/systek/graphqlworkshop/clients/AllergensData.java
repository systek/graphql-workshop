package no.systek.graphqlworkshop.clients;

import java.util.Collection;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AllergensData {
  private Collection<String> allergens;

  public AllergensData() {}
}
