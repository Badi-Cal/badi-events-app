import 'chai/register-expect';
import assert from 'assert';

// Smoke test to ensure Mocha dependencies are properly in place
describe('This Mocha test enviroment', function() {
  it('should be able to execute a test', function(){
    assert.ok(expect);
  });
});
