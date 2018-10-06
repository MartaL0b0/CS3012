# CS3012 Software Engineering 2018
Repository for all the projects related with [CS3012](https://scss.tcd.ie/Stephen.Barrett/teaching/CS3012/index.html), at Trinity College Dublin

## First Assignment: Lowest Common Ancestor
Due October 2nd, it consists of providing a program solution to the [Lowest Common Ancestor](https://www.hackerrank.com/topics/lowest-common-ancestor) problem. 

### Approach
The chosen programming language is [Python](https://www.python.org/) for its not-so-big learning curve and its increased popularity in multiple emerging technologies. 
```
For the purpose of this first assignment, the graph is assumed to be structured as a binary tree, in order to have a more standarised solution. 
```
For unit testing, after considering both [pytest](https://pytest.org/) and [unittest](https://docs.python.org/3/library/unittest.html), I decided to use the second one as more documentation to begin with was found. 

As a useful tool to improve testing, for this project the tool [Coverage.py](https://coverage.readthedocs.io/en/coverage-4.5.1x/index.html) is also included. 

## Second Assignment: Lowest Common Ancestor for Directed Acyclic Graph
Due October 19nd, it consists of providing a program solution to the [Lowest Common Ancestor](https://www.hackerrank.com/topics/lowest-common-ancestor) problem, but considering the data structure to be a Directed Acyclic Graph. 

In this case, a change of requirements is used to test the consistence of the project. To solve this, a new branch ([new_requirements](https://github.com/MartaL0b0/CS3012/tree/new_requirements)) is created. 

### Approach
Still using Python, the new approach will help to perfectionate the development process, based on the experience in the first assignment. The steps will be:
1. Redefine and detail new requirements
    1. Change in node
    2. How data structure is going to be affected
2. Design tests based on different trees. 
    1. Write them, comment them
3. Implement new node structure
4. Run current tests (from assignment 1) and see how they fail
5. Modify the current implementation and include the new tests.
6. Run it all and test. Repeat from 2 until proper behaviour. 

###New requirements:
A Directed Acyclic Graph is a data structure whose nodes are linked with a fixed direction, but there are no cycles within them (it is not possible to go from one node back to it through any fixed path). It is similar to a tree, but the root does not need to be defined, and the concept of leaves is more diffuse. 

Here is a picture of a DAG:
![picture alt](https://i.stack.imgur.com/8Nt1U.png "Directed Acyclic Graph")

For this new assignment, the definition of the data structure itself needs to change completely, but the same test still need to pass.
This changes will take place after designing the testing cases. 


## Authors
[Marta Lobo de Pablos](https://www.linkedin.com/in/marta-lobo-de-pablos/)
