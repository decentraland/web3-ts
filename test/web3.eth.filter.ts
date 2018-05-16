import chai = require('chai')
import { RequestManager } from '../dist'
const assert = chai.assert
import { FakeHttpProvider } from './helpers/FakeHttpProvider'

import { eth } from '../dist/methods/eth'

let method = 'filter'

let tests = [
  {
    args: [
      {
        fromBlock: 0,
        toBlock: 10,
        address: '0x47d33b27bb249a2dbab4c0612bf9caf4c1950855'
      }
    ],
    formattedArgs: [
      {
        fromBlock: '0x0',
        toBlock: '0xa',
        address: '0x47d33b27bb249a2dbab4c0612bf9caf4c1950855',
        topics: []
      }
    ],
    result: '0xf',
    formattedResult: '0xf',
    call: 'eth_newFilter'
  },
  {
    args: [
      {
        fromBlock: 'latest',
        toBlock: 'latest',
        address: '0x47d33b27bb249a2dbab4c0612bf9caf4c1950855'
      }
    ],
    formattedArgs: [
      {
        fromBlock: 'latest',
        toBlock: 'latest',
        address: '0x47d33b27bb249a2dbab4c0612bf9caf4c1950855',
        topics: []
      }
    ],
    result: '0xf',
    formattedResult: '0xf',
    call: 'eth_newFilter'
  },
  {
    args: ['latest'],
    formattedArgs: [],
    result: '0xf',
    formattedResult: '0xf',
    call: 'eth_newBlockFilter'
  },
  {
    args: ['pending'],
    formattedArgs: [],
    result: '0xf',
    formattedResult: '0xf',
    call: 'eth_newPendingTransactionFilter'
  }
]

describe('web3.eth', function() {
  describe(method, function() {
    tests.forEach(function(test, index) {
      it('property test: ' + index, function(done) {
        // given
        const provider = new FakeHttpProvider()
        const rm = new RequestManager(provider)

        provider.injectResult(test.result)
        provider.injectValidation(function(payload) {
          assert.equal(payload.jsonrpc, '2.0')
          assert.equal(payload.method, test.call)
          assert.deepEqual(payload.params, test.formattedArgs)
        })

        // call
        let filter = eth[method].exec(rm, ...test.args)

        // test filter.get
        if (typeof test.args === 'object') {
          let logs = [{ data: '0xb' }, { data: '0x11' }]

          provider.injectResult(logs)
          provider.injectValidation(function(payload) {
            assert.equal(payload.jsonrpc, '2.0')
            assert.equal(payload.method, 'eth_getFilterLogs')
            assert.deepEqual(payload.params, [test.formattedResult])
          })

          // async should get the fake logs
          filter.get(function(_, res) {
            assert.equal(logs, res)
            done()
          })
        }
      })
      /*
      it('should call filterCreationErrorCallback on error while filter creation', function() {
        // given
        const provider = new FakeHttpProvider()
        web3.reset()
        const rm = new RequestManager(provider)
        provider.injectError(errors.InvalidConnection())
        // call
        let args = test.args.slice()
        args.push(undefined)
        args.push(function(err) {
          assert.include(errors, err)
          done()
        })
        web3.eth[method].apply(web3.eth, args)
      })
      */
    })
  })
})
