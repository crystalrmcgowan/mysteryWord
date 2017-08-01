const { hangman } = require("../main.js")

desribe('hangman', () => {
  test('a single letter', () => {
    expect(hangman('a', '')).toBe('_')
  })
})
