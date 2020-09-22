var proxyquire = require('proxyquire').noCallThru()
import 'mocha'
import * as chai from 'chai'
import * as sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)
import { expect } from 'chai'

const PingFacadeStubs = {
  get: sinon.stub().callsFake((id) => id),
}

const { PingHelper } = proxyquire('../../src/helpers/PingHelper', {
  '../facades/PingFacade': {
    PingFacade: sinon.stub().returns(PingFacadeStubs),
  },
})

describe('PingHelper tests', function () {
  const helper = new PingHelper()

  beforeEach(sinon.resetHistory)

  it('should call get on facade when called', async function () {
    await helper.getGreeting('id')

    expect(PingFacadeStubs.get).to.have.been.called
  })

  it('should return a greeting when called', async function () {
    const ans = await helper.getGreeting('id')

    expect(ans).to.be.equal('Hello, id')
  })
})
