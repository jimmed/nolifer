const { createBranch, createLeaf } = require('redux-tree')

const initialState = ''

module.exports = createLeaf(initialState, {
  CHANGE_TEXT: (previous, { payload }) => payload,
  SEND_MESSAGE: () => initialState
})
