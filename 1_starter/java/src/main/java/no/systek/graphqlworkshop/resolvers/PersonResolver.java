package no.systek.graphqlworkshop.resolvers;

import com.coxautodev.graphql.tools.GraphQLResolver;
import no.systek.graphqlworkshop.storage.Person;
import org.springframework.stereotype.Component;

@Component
public class PersonResolver implements GraphQLResolver<Person> {

  public String getDescription(Person person) {
    return String.format("%s, %s", person.getName(), person.getTitle());
  }
}
