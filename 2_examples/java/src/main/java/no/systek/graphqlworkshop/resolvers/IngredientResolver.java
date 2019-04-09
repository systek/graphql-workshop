package no.systek.graphqlworkshop.resolvers;

import com.coxautodev.graphql.tools.GraphQLResolver;
import java.util.Collection;
import no.systek.graphqlworkshop.clients.AllergensClient;
import no.systek.graphqlworkshop.clients.MarketPriceClient;
import no.systek.graphqlworkshop.storage.Ingredient;
import org.springframework.stereotype.Component;

@Component
public class IngredientResolver implements GraphQLResolver<Ingredient> {

  private final MarketPriceClient marketPriceClient;
  private final AllergensClient allergensClient;

  public IngredientResolver(MarketPriceClient marketPriceClient, AllergensClient allergensClient) {
    this.marketPriceClient = marketPriceClient;
    this.allergensClient = allergensClient;
  }

  public Double marketPrice(Ingredient ingredient) {
    return marketPriceClient.getMarketPrice(ingredient.getName());
  }

  public Collection<String> getAllergens(Ingredient ingredient) {
    return allergensClient.getAllergens(ingredient.getName());
  }
}
