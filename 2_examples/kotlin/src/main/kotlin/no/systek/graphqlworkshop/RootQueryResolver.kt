package no.systek.graphqlworkshop

import com.coxautodev.graphql.tools.GraphQLQueryResolver
import org.springframework.stereotype.Component

val exampleData = listOf(
    Person("Karl", "Frontend Developer"),
    Person("Aage", "Software Architect"),
    Person("Ole", ".NET Developer")
)

@Component
class RootQueryResolver : GraphQLQueryResolver {

    fun getDevelopers() = exampleData
}
