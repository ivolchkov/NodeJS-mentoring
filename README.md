# NodeJS Global Mentoring Program
## HOMEWORK 1
### BASICS. NODEJS FUNDAMENTAL THEORY
#### TASK 1.1   
Write a program which reads a string from the standard input stdin, reverses it and then writes it to the standard output stdout.  
1. The program should be started from npm script via nodemon(i.e. `npm run task1`).  
2. The program should be running in a stand-by mode and should not be terminated after the first-string processing.  

#### TASK 1.2
Write a program which should do the following:  
1. Read the content of csv file from `./csv` directory. Example: [https://epa.ms/nodejs19-hw1-ex1]()
2. Use the csvtojson package [https://github.com/Keyang/node-csvtojson](https://github.com/Keyang/node-csvtojson) to convert csv file to
   json object.
3. Write the csv file content to a new txt file.
   Use the following format: [https://epa.ms/nodejs19-hw1-ex2](https://epa.ms/nodejs19-hw1-ex2.).
4. Do not load all the content of the csv file into RAM via stream (read/write file content line by
   line).
5. In case of read/write errors, log them in the console.
6. The program should be started via npm script using nodemon (i.e. `npm run task2`).
#### TASK 1.3
Rewrite the above-mentioned programs to use babel [https://babeljs.io/](https://babeljs.io/) and ES6 modules.

## HOMEWORK 2
### IN MEMORY CRUD REST SERVICE WITH VALIDATION
#### TASK 2.1   
Write a simple REST service withCRUD operations for User entity.  
1. To create REST service,use ExpressJS [https://expressjs.com/](https://expressjs.com/). 
The User should have the following properties(you can use UUIDas a user identifier (id))
2. Service should have the following CRUD operations for User:
   - get user by **_id_**; 
   - create and update user;
   - get auto-suggest list from limit users, sorted by `login` property and filtered by `loginSubstringin` the login property: `getAutoSuggestUsers(loginSubstring, limit)`
   - remove user (**_soft delete_** – user gets marked with `isDeletedflag`, but not removed from the collection).
3. Store user’s collection in the service memory (while the service is running).   
   To test the service **CRUD** methods,you can use Postman [https://www.getpostman.com/](https://www.getpostman.com/).
#### TASK 2.2
Add server-side validation for create/update operations of UserEntity:
- all fields are required;
- login validation is required;
- password must contain letters and numbers;
- user’s age must be between 4 and 130.

In case of any property does not meet the validation requirements or the field is absent, return **400 (Bad Request)** and detailed error message.
For requests validation use special packages like **joi** [https://github.com/hapijs/joi](https://github.com/hapijs/joi) [https://www.npmjs.com/package/express-joi-validation](https://www.npmjs.com/package/express-joi-validation).
## HOMEWORK 3
### POSTGRESQL AND LAYERED ARCHITECTURE
#### TASK 3.1 
Install DB PostgreSQL on your machine or use a free web hosting services for PostgreSQL [https://www.heroku.com/postgresor](https://www.heroku.com/postgresor) [https://www.elephantsql.com/plans.html](https://www.elephantsql.com/plans.html).
- Write SQL script which will create Users table in the DB and fill it in with predefined user`s collection.
- Configure your REST service to work with PostgreSQL.
- Use the sequelize package([http://docs.sequelizejs.com/](http://docs.sequelizejs.com/)) as ORM to work with PostgreSQL. As an alternative to sequelize you can use more low-level query-builder library ([http://knexjs.org/](http://knexjs.org/)).
#### TASK 3.2
The service should adhere to 3-layer architecture principles ([https://softwareontheroad.com/ideal-nodejs-project-structure/](https://softwareontheroad.com/ideal-nodejs-project-structure/)) and 
contain the following set of directories:  
<pre>
      |-routers / controllers  
      |-services  
      |-data-access  
      |-models
</pre>
## HOMEWORK 4
### SECOND ENTITY AND MANY-TO-MANY ENTITY RELATIONSHIPS
#### TASK 4.1
Add **Group** entity to already existing **REST** service with **CRUD** operations.  
1) The **Group** entity should have the following properties(you can use **UUID** as Group **id**):
<pre>
type Permission = 'READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES';
type Group = {
   id: string,
   name: string,
   permissions: Array&lt;Permission&gt;
}</pre>  
2) The service should provide the following **CRUD** operations for **Group**:
- get group by **id**;
- get all groups;
- create and update a group;
- remove group (**hard delete** – group data is fully removed from the DB).
3) Storing of groups data should be done in **PostgreSQL** in **Groups** table.
4) The service should follow the principles of 3-layer architecture.
#### TASK 4.2
Link **User** records in one table with **Group** records in another table.
1) Add a **UserGroup** table(“_many-to-many_” relationship) which will store the data 
describing which users are assigned to which group.
2) If any record gets removed from the DB, then all linked records should be removed from **UserGroup** as well.
#### TASK 4.3
Add `addUsersToGroup(groupId, userIds)` method which will allow adding users to a certain group. Use transactions 
to save records in DB
## HOMEWORK 5
### LOGGING & ERROR HANDLING
#### TASK 5.1
Add express **middleware** which will log which service method has been invoked and which arguments have been passed to it.  
#### TASK 5.2
1) Add express **middleware** which will log all unhandled errors and return a standard message with **HTTP** code `500` (**Internal Server Error**).  
   **Remark**: Do not modify the status code and the message for other errors like validation errors from the previous task.
2) Add error handling to `process.on(‘uncaughtException’,...)`.
3) Add **Unhandled promise** rejection listener to log errors.
#### TASK 5.3
Every method in the controllers should log the errors which should include the following information:
 - method name;
 - arguments which have been passed to the method;
 - error message.
#### Additional task 5*
Add middleware wrapper functions (or decorators) which will track the methods’ execution time.
## HOMEWORK 6
### JWT AUTHORIZATION AND CORS
#### TASK 6.1
Add authorization to the already existing REST service.
1) Add `login(username, password)` method which should return **JWT** token.
2) Add a middleware which will proxy all the requests (except **login**) and check that **HTTP** **Authorization** header has the
correct value of **JWT** token.
3) **HTTP Authorization** header is absent in the request, the middleware should stop further controller method execution and
return **HTTP** **401** code (**Unauthorized Error**) and standard error message.
4) In case of **HTTP Authorization** header has invalid **JWT** token in the request, the middleware should return **HTTP** code **403** 
(**Forbidden Error**) and standard error message.
#### TASK 6.2
Add CORS middleware to access service methods from WEB applications hosted on another domains ([https://github.com/expressjs/cors](https://github.com/expressjs/cors)).
