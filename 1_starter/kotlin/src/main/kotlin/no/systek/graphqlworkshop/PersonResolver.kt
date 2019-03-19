package no.systek.graphqlworkshop

import com.coxautodev.graphql.tools.GraphQLResolver
import org.springframework.stereotype.Component

@Component
class PersonResolver : GraphQLResolver<Person> {

    fun getDescription(person: Person): String {
        return String.format("%s, %s", person.name, person.title)
    }
}
