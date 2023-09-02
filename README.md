My Notes (Notes)
===

## Information

- Title:  `Backend-Notes CRUD`
- Authors:  `Daniel Camilo Bustos Rodriguez`
- Email:  `danielcbustos20@gmail.com`
- Celular:  `+573166238632`

## Code Details
    This project has the backend and Front end, for running it's neccesary running  in docker these are commands
1. In the project root please execute 'docker-compose build'
2. After that please execute 'docker-compose up -d', by doing this you will have the backend and postgres database running.
3. Now to run front end container execute cd frontend-notes
4. Finally execute 'docker build -t frontend-notes .'
5. after that execute 'docker run -d -it -p 80:80 frontend-notes'
6. now please access to 'http://localhost/notesList'
    
    
## Methods
    -Service to create 
![image](https://github.com/camilapensolvers/GitHubdanielcbustos-Ensolvers-Challenge/assets/113216382/fc900ec5-78b9-469e-9000-5dbe9227f766)


    - Get note list
   ![image](https://github.com/camilapensolvers/GitHubdanielcbustos-Ensolvers-Challenge/assets/113216382/97088119-d166-49e0-b941-83aef84bf68b)


    - Get update
   ![image](https://github.com/camilapensolvers/GitHubdanielcbustos-Ensolvers-Challenge/assets/113216382/a6d7951e-9720-4ae7-9889-3946e85ba5a6)

    

    
## Version 
    The versions the products are
    - JDK 20
    - Spring 3.1.3
    - Angular  16.0.0.1
        

## Directory Hierarchy
```
|——Root
    |—— backend-notes
    |—— frontend-notes
    |—— Readme.md 
```
