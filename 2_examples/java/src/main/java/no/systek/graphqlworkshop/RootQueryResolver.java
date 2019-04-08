package no.systek.graphqlworkshop;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class RootQueryResolver implements GraphQLQueryResolver {

  private static ArrayList<Person> exampleData = new ArrayList<Person>() {{
    add(new Person("Karl", "Frontend Developer"));
    add(new Person("Aage", "Software Architect"));
    add(new Person("Ole", ".NET Developer"));
  }};

  public List<Person> getDevelopers() {
    return exampleData;
  }
}
