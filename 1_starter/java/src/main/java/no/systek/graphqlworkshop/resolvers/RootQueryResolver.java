package no.systek.graphqlworkshop.resolvers;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import java.util.ArrayList;
import java.util.List;
import no.systek.graphqlworkshop.storage.Person;
import no.systek.graphqlworkshop.storage.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class RootQueryResolver implements GraphQLQueryResolver {

  private final PersonRepository personRepository;

  @Autowired
  public RootQueryResolver(PersonRepository personRepository) {
    this.personRepository = personRepository;
  }

  public List<Person> getDevelopers() {
    return personRepository.getAll();
  }
}
