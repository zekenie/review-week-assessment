var mongoose = require('mongoose')
  , should = require('should')
  , Article = require('../models/article');
/**
 * Start here
 *
 * These tests describe the model that you'll be setting up in models/article.js
 *
 */

describe('Articles', function () {

  /**
   * Your model should have two fields (both required) of title and body
   *
   * Check out the 'required' validator: http://mongoosejs.com/docs/api.html#schematype_SchemaType-required
   */
  it('should have a title and body field of String', function (done) {
    var article = new Article({title: "My Article", body: "Isn't this interesting?"});
    article.save(function(err) {
      article.title.should.equal("My Article");
      article.body.should.equal("Isn't this interesting?");
      done(err);
    });
  });

  it('should require title and body', function (done) {
    var article = new Article({title: "My Second Article"});
    article.save(function(err) {
      err.message.should.equal("Validation failed");
      done();
    });
  });


  /**
   * Set up an instance method (check out mongoose .methods) called asJSON that
   * will output the JSON representation of the model
   *
   * http://mongoosejs.com/docs/guide.html#methods
   */
  it('should have an instance method to get itself as JSON', function(done) {
    Article.findOne({title: "My Article"}, function(err, article) {
      var jsonArticle = article.asJSON();
      jsonArticle.should.match(/"title":"My Article"/);
      done(err);
    });
  });


  /**
   * Set up a static method called findByTitle that's a convenience
   * method to find by a title
   *
   * http://mongoosejs.com/docs/guide.html#statics
   */
  it('should have a static method to findByTitle', function(done) {
    Article.findByTitle("My Article", function(err, article) {
      article.body.should.equal("Isn't this interesting?");
      done(err);
    });
  });


  /**
   * Your Article model should also have a tag field that's an array
   * but when we access it, we should get the string joined by a comma
   *
   * Look at using getters in your Schema http://mongoosejs.com/docs/api.html#schematype_SchemaType-get
   */
  it('should have a tags field of [] that has a custom getter', function (done) {
    var article = new Article({ title: "Taggy", body: "So Taggy" });
    article.tags = ["tag1", "tag2", "tag3"];
    article.tags.should.equal("tag1,tag2,tag3");
    done();
  });

});
