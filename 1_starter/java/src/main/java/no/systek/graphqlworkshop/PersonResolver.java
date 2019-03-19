package no.systek.graphqlworkshop;

import com.coxautodev.graphql.tools.GraphQLResolver;
import org.springframework.stereotype.Component;

@Component
public class PersonResolver implements GraphQLResolver<Person> {

  public String getDescription(Person person) {
    return String.format("%s, %s", person.getName(), person.getTitle());
  }
}
