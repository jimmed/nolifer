const { createStore } = require('redux')
const { createTree } = require('redux-tree')
const actions = require('./actions')
const reducerBranch = require('./reducer')

const reducer = createTree({ text: reducerBranch })

describe('MessageEditor reducer', () => {
  let store, state
  const updateState = () => {
    state = store.getState().text
  }
  beforeEach(() => {
    store = createStore(reducer)
    updateState()
  })

  afterEach(() => {
    store = null
    state = null
  })

  test('is a function', () => {
    expect(typeof reducer).toBe('function')
  })

  describe('Initial state', () => {
    test('should have empty text', () => {
      expect(state).toBeFalsy()
    })
  })

  describe('On change', () => {
    beforeEach(() => {
      store.dispatch(actions.changeText('Edited message!'))
      updateState()
    })
    test('should change', () => {
      expect(state).toBe('Edited message!')
    })
  })

  describe('After sending message', () => {
    beforeEach(() => {
      store.dispatch(actions.sendMessage('Sent message!'))
      updateState()
    })
    test('should reset', () => {
      expect(state).toBe('')
    })
  })
})
