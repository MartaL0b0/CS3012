# CS3012 Software Engineering 2018
Repository for all the projects related to [CS3012](https://scss.tcd.ie/Stephen.Barrett/teaching/CS3012/index.html), at Trinity College Dublin.

## First Assignment: Lowest Common Ancestor
It consists of providing a program solution to the [Lowest Common Ancestor](https://www.hackerrank.com/topics/lowest-common-ancestor) problem. 

The chosen programming language is [Python](https://www.python.org/) for its not-so-big learning curve and its increased popularity in multiple emerging technologies. 
```
For the purpose of this first assignment, the graph is assumed to be structured as a binary tree.
```
For unit testing, after considering both [pytest](https://pytest.org/) and [unittest](https://docs.python.org/3/library/unittest.html), I decided to use the second one as more documentation to begin with was found. 

As a useful tool to improve testing, for this project the tool [Coverage.py](https://coverage.readthedocs.io/en/coverage-4.5.1x/index.html) is also included. 


## Second Assignment: Lowest Common Ancestor in a Directed Acyclic Graph
More information can be found on the branch *new_requirements* 

## Third assignment: Engineer Biography
For this task, I chose to update my friend's [Luz Rello](http://www.luzrello.com/) Wikipedia page, which is currently only avaliable in [Spanish](https://es.wikipedia.org/w/index.php?title=Luz_Rello_S%C3%A1nchez). It is meant to be uploaded in both languages by the end of 2018.

Luz is a Spanish researcher in HCI and Linguistics, and has developed a system to detect and treat dyslexia. Her social enterprise [Change Dyslexia](https://www.changedyslexia.org/) is helping more than 150 000 children worldwide to overcome this disorder. We have collaborated to release a truthful and honest biography, that included her latest achievents and showed the social implications her project has. It was a great pleasure, and an honour, working with her.



## Forth assignment: Measuring Engineering
My engineering measurement report is meant to provide an overview of current challenges and implications that software engineering is facing. I also give my opinion about the ethical implications this activity implies, by relying to the ACM Code of Ethics. I really hoped the Computer Engineers had a *hypocratic oath* sort of thing. 


## Fifth assignment: Github Access
This assignment consists on a simple web client that, given a username and a password provided by the user, it makes a call to the Github API using the Fetch JS API, and displays basic information about that user. It is the first step towards the last assignment, although it won't be used for it explicitly (at least the platform). 
The approach is inspired in [this tutorial](https://www.youtube.com/watch?v=sJspH620ZsU&t=691s), which I used to set the starting point.

As it is just a Client Web File, there is no need for a server. The calls are done via browser, so an Internet conection is required. 
To access it, browse to [https://github-access-lobodepm.firebaseapp.com/](https://github-access-lobodepm.firebaseapp.com/)



## Sixth assignment: Social Graph
For this last assignment, I display the information about commits stats from a particular repo, by fetching the *punchcard* information from the Github API. This is managed through a fully functional Client Web API deployed here: [https://social-graph-lobodepm.firebaseapp.com/](https://social-graph-lobodepm.firebaseapp.com/)

The program flow is as follows:
* User logs in using Github credentials (either email or username) and password
![User login](http://www.brightlightpictures.com/assets/images/portfolio/thethaw_header.jpg "Login")
  * Handled errors for missing credentials or incorrect username / password.
  ![missing parameter](http://www.brightlightpictures.com/assets/images/portfolio/thethaw_header.jpg "missing parameter")
  ![bad credentials](http://www.brightlightpictures.com/assets/images/portfolio/thethaw_header.jpg "bad credentials")
* User information and repositories are retrieved after logged in: `GET user/` and `GET user/repos` 
* A list of repositories is displayed, distinguishing between those owned by the user herself, or by a third one (user or organization).
![Repo List](http://www.brightlightpictures.com/assets/images/portfolio/thethaw_header.jpg "Repo List")
* When clicked in any repository, a new view is loaded with a **punchcard chart**. 
![Punchcard](http://www.brightlightpictures.com/assets/images/portfolio/thethaw_header.jpg "Punchcard")
  * Handled errors for empty repository (no commits) or not found. 
  ![empty repo](http://www.brightlightpictures.com/assets/images/portfolio/thethaw_header.jpg "empty repo")
  ![not found repo](http://www.brightlightpictures.com/assets/images/portfolio/thethaw_header.jpg "not found repo")
* In the top right corner, user can navigate and change between **commits per day** and **commits per hour**. 
![commits per day](http://www.brightlightpictures.com/assets/images/portfolio/thethaw_header.jpg "commits per day")
![commits per hour](http://www.brightlightpictures.com/assets/images/portfolio/thethaw_header.jpg "commits per hour")

* At the bottom of the page, a bit of information about the chart and its utility in software development. In case a new repository is wanted to be displayed, there is a button to go back to the main page.
![explanaition + new search](http://www.brightlightpictures.com/assets/images/portfolio/thethaw_header.jpg "explanaition + new search")








