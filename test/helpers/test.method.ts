import chai = require('chai')
const assert = chai.assert

import { FakeHttpProvider } from './FakeHttpProvider'
import { RequestManager, Method } from '../../dist'
import { SolidityFunction } from '../../dist/SolidityFunction'

export function runTests(
  testName: string,
  fn: Method | SolidityFunction,
  tests: { result; call; formattedArgs; args; formattedResult }[]
) {
  describe(testName, function() {
    tests.forEach(function(test, index) {
      it('async test: ' + index, async function() {
        // given
        const provider = new FakeHttpProvider()
        const rm = new RequestManager(provider)

        provider.injectResult(test.result)

        provider.injectValidation(function(payload) {
          assert.equal(payload.jsonrpc, '2.0')
          assert.equal(payload.method, test.call)
          assert.deepEqual(payload.params, test.formattedArgs)
        })

        const result = await fn.exec(rm, ...test.args)

        assert.deepEqual(test.formattedResult, result)
      })
    })
  })
}
