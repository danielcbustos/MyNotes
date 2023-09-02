Backend Notes (Notas)
===

## Information

- Title:  `Backend-Notes CRUD`
- Authors:  `Daniel Camilo Bustos Rodriguez`
- Email:  `danielcbustos20@gmail.com`
- Celular:  `+573166238632`

## Version 
    The versions the products are
    - JDK 20
    - Spring 3.1.3
        
## Code Details
    This project is the backend, this has the connectivity to the postgres database (its name is `note`)
## Directory Hierarchy
```
|—— .gitignore
|—— .mvn
|    |—— wrapper
|        |—— maven-wrapper.jar
|        |—— maven-wrapper.properties
|—— mvnw
|—— mvnw.cmd
|—— pom.xml
|—— src
|    |—— main
|        |—— java
|            |—— com
|                |—— ensolvers
|                    |—— backendnotes
|                        |—— BackendNotesApplication.java
|                        |—— controllers
|                            |—— CategoryController.java
|                            |—— NoteController.java
|                        |—— entities
|                            |—— Category.java
|                            |—— Note.java
|                        |—— repositories
|                            |—— contracts
|                                |—— ICategoryRepository.java
|                                |—— INoteRespository.java
|                        |—— services
|                            |—— contracts
|                                |—— ICategoryService.java
|                                |—— INoteService.java
|                            |—— implementations
|                                |—— CategoryService.java
|                                |—— NoteService.java
|        |—— resources
|            |—— application.properties
|    |—— test
|        |—— java
|            |—— com
|                |—— ensolvers
|                    |—— backendnotes
|                        |—— BackendNotesApplicationTests.java


