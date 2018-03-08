# mariner
comment analysis app

**Requirements:**
* Node 7.4 or higher
* start all apps as complete servers
* Routing between apps is by port

**Mariner uses three services:**
*Login App-
Logs in user and returns name and ID to Server. Aloso posts 
user video and comment data to Comment Retriever App

*Comment Retriever-
Stores user data

*SA-
Rates text
deployed at https://thawing-plateau-28784.herokuapp.com/
api route: https://thawing-plateau-28784.herokuapp.com/api/[text to be screened]
api returns json tree of text with analysis


New repo who dis