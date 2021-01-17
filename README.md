# Interview Scheduler

A Interview scheduler project made to help me learn about various technologies like -
+ NodeJS (and surrounding modules - express, async, mongoose, hbs, mongodb)
+ Middlewares, view engines, callbacks, promises.
+ MongoDB

## Functionality
The landing page provides you with 2 options, one to get the list of candidates and the interview timings (if any) scheduled to them, the other to add interviews to the chosen candidates.\
The data is stored in a MongoDB cluster (URI has been redacted, please add your own)

## Expandabiliy
This can be expanded to include a front-end framework to make the whole process pleasing to the eyes.

## Input Validation
As an added restriction to help me learn validation, I have added a validator that checks if all the input i.e. list of candidates, start time and end time to be required and the list of candidates to be atleast of 2 length when submitting it to the server.\
A checker has been added so that a candidate does not have an interview re-alloted to him/her.

## Usability
Add URI to your Atlas deployment of choice and populate the chosen database with data as per the schema making sure that the st and ed fields are initialised with -1 (see samples given in the notes section).\
Run the index.js and open the port number (default 3000).

## Notes
A document with the following object-data would be considered valid - {name: qwerty, st: -1, ed: -1}\
A document with the following object-data would be considered invalid - {name: qwerty, st: 2, ed: 4}
