package no.systek.graphqlworkshop.storage;

import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public class PersonRepository {

  private static ArrayList<Person> exampleData = new ArrayList<Person>() {{
    add(new Person("Karl", "Frontend Developer"));
    add(new Person("Aage", "Software Architect"));
    add(new Person("Ole", ".NET Developer"));
  }};

  public List<Person> getAll() {
    return exampleData;
  }
}
