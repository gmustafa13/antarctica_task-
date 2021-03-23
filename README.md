# antarctica_task-

## file structure
* I am follow MVC structure , for that in root we have:
.env
.gitignore
index.js
node_modules
package-lock.json
package.json
README.md
src

src folder contains:
config (db related configuration)
controller (all table controller)
middleware (auth middleware)
routes (routes of user and employee)
schema (define both table schema)
services (both table services i.e business logic)
utils (error,success, terminate error function)

## entry point of project:
index.js is the entry point of project ,where express initialization routes, server ,body parser was initialized and used

## for auth
for authentication i have used jwt , after successful sign in we provide token witch encapsulate email of user with validity of 1 hour

for password encryption bycrpt is used for encryption beforeSave() hook is used 


# running project :

npm i

configure .env

run node index.js or used nodemon

# base route
for user base route is host:port/user  and host:port/emp
