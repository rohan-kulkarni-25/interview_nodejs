# Interview Scheduler

A Interview scheduler project made to help me learn nodejs and various technologies (like: npm, joi, express etc) surrounding it.

## Functionality
The landing page provides you with 2 options, one to get the list of candidates and the interview timings (if any) scheduled to them, the other to 
add interviews to the chosen candidates.

## Expandabiliy
This can be expanded to include database management using technologies like MongoDB, SQL etc and to include a front-end to make the whole process pleasing to the eyes.

## Input Validation
As an added restriction to help me learn validation, I have added a validator that checks if all the input i.e. list of candidates, start time and end time to be required
and the list of candidates to be atleast of 2 length when submitting it to the server.
A checker has been added so that a candidate does not have an interview re-alloted to him/her.
