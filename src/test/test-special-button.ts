import { expect } from 'chai'
import * as index from '../core/index'

describe('test special replace for buttons', () => {
  it('elevatedbutton', async function () {
    const value = this.test?.title || ''
    const res = index.expand(value)
    expect('ElevatedButton(\n\t\tonPressed: () {},$1)').equal(res)
  })
  it('TextButton', async function () {
    const value = this.test?.title || ''
    const res = index.expand(value)
    expect('TextButton(\n\t\tonPressed: () {},$1)').equal(res)
  })
  it('IconButton', async function () {
    const value = this.test?.title || ''
    const res = index.expand(value)
    expect('IconButton(\n\t\tonPressed: () {},$1)').equal(res)
  })
  it('FloatingActionButton', async function () {
    const value = this.test?.title || ''
    const res = index.expand(value)
    expect('FloatingActionButton(\n\t\tonPressed: () {},$1)').equal(res)
  })
  it('DropDownButton', async function () {
    const value = this.test?.title || ''
    const res = index.expand(value)
    expect('DropDownButton(\n\t\tonPressed: () {},$1)').equal(res)
  })
  it('cupertinobutton', async function () {
    const value = this.test?.title || ''
    const res = index.expand(value)
    expect('CupertinoButton(\n\t\tonPressed: () {},$1)').equal(res)
  })
  it('string[elevatedbutton,elevatedbutton]', async function () {
    const value = this.test?.title || ''
    const res = index.expand(value)
    expect(
      'String(\n\tchildren: <Widget>[\n\t\tElevatedButton(\n\t\tonPressed: () {},$1),\n\t\tElevatedButton(\n\t\tonPressed: () {},$2),\n\t],\n)'
    ).equal(res)
  })
})
