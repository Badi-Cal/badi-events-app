import JSDOM from 'jsdom-global';

/**
 * jsdom-global will inject document, window and other DOM API into
 * Node.js environment.
 * 
 * @see https://github.com/jsdom/jsdom#simple-options
 */
const jsDOM = new JSDOM(``, {
  url: "http://localhost"
})

describe('hooks', function () {
  before(function () {
    // runs once before the first test in this block
    this.jsdom = jsDOM;
  });

  after(function () {
    // clean up node globals
    this.jsdom.cleanup();
  });
});
