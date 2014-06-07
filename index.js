
/**
 * Expose `Tester`.
 */

module.exports = Tester;

/**
 * Initialize a new `Tester`.
 *
 * @param {Parser} parser
 * @api public
 */

function Tester(parser) {
  this.bind(parser);
}

/**
 * Bind a `parser`.
 *
 * @param {Parser} parser
 * @api public
 */

Tester.prototype.bind = function(parser){
  this.parser = parser;
};

/**
 * Test helper for mocha.
 *
 * @api public
 */

Tester.prototype.test = function(str, log){
  var self = this;
  return it(str, function(){
    assert.equal(str, self.compile(str, log));
  });
};

/**
 * Parse `str` to ast, then stringify back.
 *
 * @param {String} str
 * @return {String}
 * @api public
 */

Tester.prototype.compile = function(str, log){
  var ast = this.parser.parse(str);
  if (log) console.log(JSON.stringify(ast, null, 2));
  return this.stringify(ast);
};

/**
 * For testing, it should generate the original string.
 *
 * @param {Token} token
 * @api public
 */

Tester.prototype.stringify = function(token){
  if (!token) return '';
  var html = [];
  if (Array.isArray(token.content)) {
    token.content.forEach(function(child){
      html.push(stringify(child));
    });
  } else if (null != token.content) {
    html.push(stringify(token.content));
  } else {
    html.push(token);
  }

  return html.join('');
};