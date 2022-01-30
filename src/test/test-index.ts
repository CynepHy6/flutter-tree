import { expect } from 'chai'
import * as index from '../core/index'

describe('validate', () => {
  it('string', async function () {
    const value = this.test?.title || ''
    expect(false).equal(index.validate(value))
  })
  it('string[string]', async function () {
    const value = this.test?.title || ''
    expect(true).equal(index.validate(value))
  })
  it('string[string]>', async function () {
    const value = this.test?.title || ''
    expect(false).equal(index.validate(value))
  })
  it('string[string]>string', async function () {
    const value = this.test?.title || ''
    expect(false).equal(index.validate(value))
  })
  it('string>string', async function () {
    const value = this.test?.title || ''
    expect(true).equal(index.validate(value))
  })
  it('string[string,]', async function () {
    const value = this.test?.title || ''
    expect(true).equal(index.validate(value))
  })
  it('string[string,string]', async function () {
    const value = this.test?.title || ''
    expect(true).equal(index.validate(value))
  })
  it('string<[string,string]', async function () {
    const value = this.test?.title || ''
    expect(false).equal(index.validate(value))
  })
  const excludes = ['>]', '][', '] >', '[[', ',,', '!', '<', '(', ')', '$', ']>']
  for (const val of excludes) {
    it(`string${val}`, async function () {
      const value = this.test?.title || ''
      expect(false).equal(index.validate(value))
    })
  }
  it('string[]', async function () {
    const value = this.test?.title || ''
    expect(true).equal(index.validate(value))
  })
})
describe('expand', () => {
  it('string>string', async function () {
    const value = this.test?.title || ''
    expect('String(\n\tchild: String($1),\n),').equal(index.expand(value))
  })
  it('string[string]', async function () {
    const value = this.test?.title || ''
    expect('String(\n\tchildren: <Widget>[\n\t\tString($1),\n\t],\n),').equal(index.expand(value))
  })
  it('string[string,string]', async function () {
    const value = this.test?.title || ''
    expect('String(\n\tchildren: <Widget>[\n\t\tString($1),\n\t\tString($2),\n\t],\n),').equal(index.expand(value))
  })
  it('string[string,string]', async function () {
    const value = this.test?.title || ''
    expect('String(\n\tchildren: <Widget>[\n\t\tString($1),\n\t\tString($2),\n\t],\n),').equal(index.expand(value))
  })
  it('string[string,string[string]]', async function () {
    const value = this.test?.title || ''
    expect(
      'String(\n\tchildren: <Widget>[\n\t\tString($1),\n\t\tString(\n\t\t\tchildren: <Widget>[\n\t\t\t\tString($2),\n\t\t\t],\n\t\t),\n\t],\n),'
    ).equal(index.expand(value))
  })
  it('string[]', async function () {
    const value = this.test?.title || ''
    expect('String(\n\tchildren: <Widget>[\n\t\t\n\t],\n),').equal(index.expand(value))
  })
})
