package no.systek.graphqlworkshop.storage

import org.springframework.stereotype.Repository

@Repository
class PersonRepository {
    private val exampleData = listOf(
        Person("Karl", "Frontend Developer"),
        Person("Aage", "Software Architect"),
        Person("Mikael", "Typer of Code")
    )

    fun getAll() = exampleData
}
