package no.systek.graphqlworkshop.resolvers

import com.coxautodev.graphql.tools.GraphQLResolver
import no.systek.graphqlworkshop.storage.Person
import org.springframework.stereotype.Component

@Component
class PersonResolver : GraphQLResolver<Person> {
    fun getDescription(person: Person): String = String.format("%s, %s", person.name, person.title)
}
