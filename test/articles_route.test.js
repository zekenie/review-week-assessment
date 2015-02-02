var mongoose = require('mongoose')
  , should = require('should')
  , request = require('supertest')
  , app = require('../app')
  , context = describe
  , Article = require('../models/article')
  , agent = request.agent(app);



/**
 * Article Route Tests
 *
 * Do these after you finish the Article Model tests
 */
describe('Articles Route', function () {

  /**
   * First we clear the database before beginning each run
   */
  before(function (done) {
    require('./helper').clearDb(done);
  });


  describe('GET /articles', function () {
    /**
     * Problem 1
     * We'll run a GET request to /articles
     *
     * 1.  It should return JSON (res.json)
     * 2.  Because there isn't anything in the DB, it should be an empty array
     *
     * Extra Credit: Consider using app.param to automatically load
     * in the Article whenever a param :id is detected
     */
    it('should respond with Content-Type text/json', function (done) {
      agent
      .get('/articles')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(function(res) {
        // res.body is the JSON return object
        res.body.should.be.an.instanceOf(Array);
        res.body.length.should.equal(0);
      })
      .end(done);
    });


    /**
     * Problem 2
     * Save an article in the database using our model and then retrieve it
     * using the GET /articles
     *
     */
    it('should return an article if there is one in the DB', function (done) {
      var article = new Article({title: "Test Article", body: "Test Body"});
      article.save(function(err) {
        agent
          .get('/articles')
          .expect(200)
          .expect(function(res) {
            res.body.should.be.an.instanceOf(Array);
            res.body[0].body.should.equal("Test Body");
          })
          .end(done);
      });
    });

    /**
     * Problem 3
     * Save a second article in the database using our model and then retrieve it
     * using the GET /articles
     *
     */
    it('should return an article if there is one in the DB', function (done) {
      var article = new Article({title: "Another Test Article", body: "Another Test Body"});
      article.save(function(err) {
        agent
          .get('/articles')
          .expect(200)
          .expect(function(res) {
            res.body.should.be.an.instanceOf(Array);
            res.body[0].body.should.equal("Test Body");
            res.body[1].body.should.equal("Another Test Body");
          })
          .end(done);
      });
    });
  });


  /**
   * Search for articles by ID
   */
  describe('GET /articles/:id', function () {
    var article;

    // create another article for test
    before(function(done) {
      article = new Article({title: "Second Article", body: "This article is good"});
      article.save(done);
    });

    /**
     * This is a proper GET /articles/ID request
     * where we search by the ID of the article created above
     */
    it('should return the JSON of the article based on the id', function (done) {
      agent
        .get('/articles/' + article._id)
        .expect(200)
        .expect(function(res) {
          res.body.title.should.equal("Second Article");
        })
        .end(done);
    });

    /**
     * Here we pass in a bad ID to the URL, we should get a 500 error
     */
    it('should return a 500 error if the ID is not correct', function (done) {
      agent
        .get('/articles/' + "821083012083012983")
        .expect(500)
        .end(done);
    });
  });

  /**
   * Series of tests to test creation of new Articles using a POST
   * Request to /articles
   */
  describe('POST /articles', function () {

    /**
     * Test the creation of an article
     * Here we don't get back just the article, we get back a Object
     * of this type
     *
     * {
     *   message: "Created Successfully"
     *   article: {
     *     _id: ...
     *     title: ...
     *   }
     * }
     */
    it('should be able to create a new article', function (done) {
      agent
        .post('/articles')
        .send({'title': 'Awesome POST created article', 'body': "Can you believe I did this in a test?"})
        .expect(200)
        .expect(function(res) {
          res.body.message.should.equal('Created Successfully');
          res.body.article.title.should.equal('Awesome POST created article');
        })
        .end(done);
    });

    // This one should fail with a 500 because we don't set the article.body
    it('should be not be able to create a new article without a body', function (done) {
      agent
        .post('/articles')
        .send({'title': 'Awesome POST created article'})
        .expect(500)
        .end(done);
    });

    // Check if the articles were actually saved to the database
    it('should check that the last two posts saved to the DB', function (done) {
      Article.findOne({title: 'Awesome POST created article'}, function(err, article) {
        article.body.should.equal("Can you believe I did this in a test?");
        article.should.be.an.instanceOf(Article);
        done();
      });
    });
  });


  /**
   * Series of tests to test updating of Articles using a PUT
   * Request to /articles/:id
   */
  describe('PUT /articles', function () {
    var article;

    before(function(done) {
      Article.findOne({title: 'Awesome POST created article'}, function(err, _article) {
        article = _article;
        done();
      });
    });

    /**
     * Test the updating of an article
     * Here we don't get back just the article, we get back a Object
     * of this type
     *
     * {
     *   message: "Updated Successfully"
     *   article: {
     *     _id: ...
     *     title: ...
     *   }
     * }
     */
    it('should be able to update an article', function (done) {
      agent
        .put('/articles/' + article._id)
        .send({'title': 'Awesome PUT updated article'})
        .expect(200)
        .expect(function(res) {
          res.body.message.should.equal('Updated Successfully');
          res.body.article.title.should.equal('Awesome PUT updated article');
          res.body.article.body.should.equal('Can you believe I did this in a test?');
        })
        .end(done);
    });
  });



});