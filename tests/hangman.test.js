const { hangman } = require("../hangman.js")

describe('hangman', () => {
  test('a single letter', () => {
    expect(hangman('a')).toBe('_')
  })

  test('multi-letter word', () => {
    expect(hangman('rawr')).toBe('____')
  })
})
