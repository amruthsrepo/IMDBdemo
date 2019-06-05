# IMDBdemo
An assignment project for DeltaX

This is a MERN stack application.

After cloning the repository, please do the following if you're a windows user:
>In imdbexpress folder, delete node_modules and package.json
>Run <npm install>

Validations used:
>Any movie must have a name, poster, producer, at least 1 actor and a Year of release
>An actor or a producer must have name, sex, dob
>Any 2 movies cannot have the same name and year of release
>Any 2 actors cannot have same name and date of birth
>Any 2 producers cannot have same name and date of birth

Database:
>A movie would contain the forign keys to it's poster, actors and producers from their own tables
>An actor can play in multiple movies
>A producer can produce multiple movies
>A movie can have only 1 producer
