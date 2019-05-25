package no.systek.graphqlworkshop.resolvers

import com.coxautodev.graphql.tools.GraphQLQueryResolver
import no.systek.graphqlworkshop.storage.PersonRepository
import org.springframework.stereotype.Component

@Component
class RootQueryResolver(private val personRepository: PersonRepository) : GraphQLQueryResolver {
    fun getDevelopers() = personRepository.getAll()
}
