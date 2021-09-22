# NodeJS Global Mentoring Program
## HOMEWORK 1
### BASICS. NODEJS FUNDAMENTAL THEORY
#### TASK 1.1   
Write a program which reads a string from the standard input stdin, reverses it and then writes it to the standard output stdout.  
1. The program should be started from npmscript via nodemon(i.e. `npm run task1`).  
2. The program should be running in a stand-by mode and should not be terminated after the first-string processing.  

#### TASK 1.2
Write a program which should do the following:  
1. Read the content of csv file from `./csv` directory. Example: [https://epa.ms/nodejs19-hw1-ex1]()
2. Use the csvtojson package ([https://github.com/Keyang/node-csvtojson](Use the csvtojson package (https://github.com/Keyang/node-csvtojson) to convert csv file to
json object.)) to convert csv file to
   json object.
3. Write the csv file content to a new txt file.
   Use the following format: [https://epa.ms/nodejs19-hw1-ex2](Write the csv file content to a new txt file.
Use the following format: https://epa.ms/nodejs19-hw1-ex2.).
4. Do not load all the content of the csv file into RAM via stream (read/write file content line by
   line).
5. In case of read/write errors, log them in the console.
6. The program should be started via npm script using nodemon (i.e. `npm run task2`).
#### TASK 1.3
Rewrite the above-mentioned programs to use babel ([https://babeljs.io/](Rewrite the above-mentioned programs to use babel (https://babeljs.io/) and ES6 modules.)) and ES6 modules.