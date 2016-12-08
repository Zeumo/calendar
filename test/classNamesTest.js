import expect from 'unexpected'
import classNames from '../src/classNames'

describe('classNames', () => {
  it('accepts string arguments', () => {
    expect(classNames('active'), 'to equal', 'active')
  })

  it('accepts objects', () => {
    expect(classNames({ active: true }), 'to equal', 'active')
  })

  it('accepts mixed arguments', () => {
    expect(classNames('button', { active: true }), 'to equal', 'button active')
  })

  it('removes falsy values', () => {
    expect(classNames({ active: false }), 'to equal', '')
    expect(classNames('button', { active: false }), 'to equal', 'button')
  })
})
