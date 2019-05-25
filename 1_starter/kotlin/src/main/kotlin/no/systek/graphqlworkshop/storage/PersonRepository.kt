package no.systek.graphqlworkshop.storage

import org.springframework.stereotype.Repository

@Repository
class PersonRepository {
    private val exampleData = listOf(
        Person("Karl", "Frontend Developer"),
        Person("Aage", "Software Architect"),
        Person("Ole", ".NET Developer")
    )

    fun getAll() = exampleData
}
