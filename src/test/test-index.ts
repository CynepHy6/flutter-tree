import { expect } from 'chai'
import * as index from '../core/index'

describe('validate', () => {
  it('string', async function () {
    const value = this.test?.title || ''
    const res = index.validate(value)
    expect(res).equal(false)
  })
  it('string[string]', async function () {
    const value = this.test?.title || ''
    const res = index.validate(value)
    expect(res).equal(true)
  })
  it('string[string]>', async function () {
    const value = this.test?.title || ''
    const res = index.validate(value)
    expect(res).equal(false)
  })
  it('string[string]>string', async function () {
    const value = this.test?.title || ''
    const res = index.validate(value)
    expect(res).equal(false)
  })
  it('string>string', async function () {
    const value = this.test?.title || ''
    const res = index.validate(value)
    expect(res).equal(true)
  })
  it('string[string,]', async function () {
    const value = this.test?.title || ''
    const res = index.validate(value)
    expect(res).equal(true)
  })
  it('string[string,string]', async function () {
    const value = this.test?.title || ''
    const res = index.validate(value)
    expect(res).equal(true)
  })
  it('string<[string,string]', async function () {
    const value = this.test?.title || ''
    const res = index.validate(value)
    expect(res).equal(false)
  })
  const excludes = ['>]', '][', '] >', '[[', ',,', '!', '<', '(', ')', '$', ']>']
  for (const val of excludes) {
    it(`string${val}`, async function () {
      const value = this.test?.title || ''
      const res = index.validate(value)
      expect(res).equal(false)
    })
  }
  it('string[]', async function () {
    const value = this.test?.title || ''
    const res = index.validate(value)
    expect(res).equal(true)
  })
})
describe('expand', () => {
  it('string>string', async function () {
    const value = this.test?.title || ''
    const res = index.expand(value)
    expect(res).equal('String(\n\tchild: String($1),\n)')
  })
  it('string[string]', async function () {
    const value = this.test?.title || ''
    const res = index.expand(value)
    expect(res).equal('String(\n\tchildren: <Widget>[\n\t\tString($1),\n\t],\n)')
  })
  it('string[string,string]', async function () {
    const value = this.test?.title || ''
    const res = index.expand(value)
    expect(res).equal('String(\n\tchildren: <Widget>[\n\t\tString($1),\n\t\tString($2),\n\t],\n)')
  })
  it('string[string,string]', async function () {
    const value = this.test?.title || ''
    const res = index.expand(value)
    expect(res).equal('String(\n\tchildren: <Widget>[\n\t\tString($1),\n\t\tString($2),\n\t],\n)')
  })
  it('string[string,string[string]]', async function () {
    const value = this.test?.title || ''
    const res = index.expand(value)
    expect(res).equal(
      'String(\n\tchildren: <Widget>[\n\t\tString($1),\n\t\tString(\n\t\t\tchildren: <Widget>[\n\t\t\t\tString($2),\n\t\t\t],\n\t\t),\n\t],\n)'
    )
  })
  it('string[]', async function () {
    const value = this.test?.title || ''
    const res = index.expand(value)
    expect(res).equal('String(\n\tchildren: <Widget>[\n\t\t\n\t],\n)')
  })
  it('string>padding', async function () {
    const value = this.test?.title || ''
    const res = index.expand(value)
    expect(res).equal('String(\n\tchild: Padding(\n\t\tpadding: ,$1),\n)')
  })
  it('string>padding>text', async function () {
    const value = this.test?.title || ''
    const res = index.expand(value)
    expect(res).equal('String(\n\tchild: Padding(\n\t\tpadding: ,\n\t\tchild: Text($1),\n\t),\n)')
  })
  it('scaffold>text', async function () {
    const value = this.test?.title || ''
    const res = index.expand(value)
    expect(res).equal('Scaffold(\n\tbody: Text($1),\n)')
  })
  it('string>aspectratio', async function () {
    const value = this.test?.title || ''
    const res = index.expand(value)
    expect(res).equal('String(\n\tchild: AspectRatio(\n\t\taspectRatio: ,$1),\n)')
  })
  it('string>aspectratio>text', async function () {
    const value = this.test?.title || ''
    const res = index.expand(value)
    expect(res).equal('String(\n\tchild: AspectRatio(\n\t\taspectRatio: ,\n\t\tchild: Text($1),\n\t),\n)')
  })
  it('string>transform', async function () {
    const value = this.test?.title || ''
    const res = index.expand(value)
    expect(res).equal('String(\n\tchild: Transform(\n\t\ttransform: ,$1),\n)')
  })
  it('string>transform>text', async function () {
    const value = this.test?.title || ''
    const res = index.expand(value)
    expect(res).equal('String(\n\tchild: Transform(\n\t\ttransform: ,\n\t\tchild: Text($1),\n\t),\n)')
  })
  it('string>richtext', async function () {
    const value = this.test?.title || ''
    const res = index.expand(value)
    expect(res).equal('String(\n\tchild: RichText(\n\t\ttext: ,$1),\n)')
  })
  it('string>richtext>text', async function () {
    const value = this.test?.title || ''
    const res = index.expand(value)
    expect(res).equal('String(\n\tchild: RichText(\n\t\ttext: ,\n\t\tchild: Text($1),\n\t),\n)')
  })
  it('string>constrainedbox', async function () {
    const value = this.test?.title || ''
    const res = index.expand(value)
    expect(res).equal('String(\n\tchild: ConstrainedBox(\n\t\tconstraints: ,$1),\n)')
  })
  it('string>constrainedbox>text', async function () {
    const value = this.test?.title || ''
    const res = index.expand(value)
    expect(res).equal('String(\n\tchild: ConstrainedBox(\n\t\tconstraints: ,\n\t\tchild: Text($1),\n\t),\n)')
  })
})
