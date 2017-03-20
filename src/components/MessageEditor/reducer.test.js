const {createStore} = require('redux')
const {createTree} = require('redux-tree')
const actions = require('./actions')
const reducerBranch = require('./reducer')

const reducer = createTree({text: reducerBranch})

describe('MessageEditor reducer', () => {
  let store
  let state

  const updateState = () => {
    state = store.getState().text
  }
  const dispatchAndUpdate = action => {
    store.dispatch(action)
    updateState()
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
    beforeEach(() => dispatchAndUpdate(actions.changeText('Edited message!')))

    test('should change', () => {
      expect(state).toBe('Edited message!')
    })
  })

  describe('After sending message', () => {
    beforeEach(() => dispatchAndUpdate(actions.sendMessage('Sent message!')))

    test('should reset', () => {
      expect(state).toBe('')
    })
  })
})
