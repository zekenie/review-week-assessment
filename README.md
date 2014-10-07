# Assessment 2 - Express/Mongoose

October 2014

This is the second assessment of the semester.  We're doing this primarily to help us understand how well you've absorbed.  Don't stress out that we will be using this test to judge you in any way except to understand how we can better help you.

Also, we ask that you don't help each other or cheat.  Feel free to use any online resource but don't copy/paste answers to each other or if you find something similar online.

## Resources

The following resources are allowed:

* Dash with any docset.  We recommend atleast `JavaScript`
* Any notes you've taken so far in Evernote/Paper
* Any code you have in your previous projects
* learn.fullstackacademy.com (we will provide a local instance that you can use)
* All the slide decks that we've used in class

## Things we're testing

* Express App Structures 
* Express Routing and Route Methods
* Mongoose Model Configuration

## Starting

1. Fork this repository to your own Github user account
2. Clone this to your local machine
3. `npm install`
4. You can run `npm test` which will continuously run the test suite upon file updates
5. Read through the project structure, you'll be primarily working in `models/article.js` and  `routes/index.js` in that order. 
6. Start working through the tests in `test/`.  You have to mark them as active (from pending) by changing `xit` to `it`
7. `git commit` often as you make progress on the tests.

The only thing that may be confusing is that you haven't seen integration-testing before, we're using a library called Supertest that can simulate GET/POST/PUT requests.  It should be pretty obvious once you start reading the tests in the `/test` directory how it works, otherwise check it out at [supertest - github](https://github.com/visionmedia/supertest)

## Submitting

As you complete each answer (or make an update), please commit the changes to the git repository.  To submit your answers, there are two steps:

1.  Push your repository back to your own personal fork of `assessment-express-mongoose`
2.  Notify us via email that your assessment is complete.
