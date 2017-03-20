const {createTree} = require('redux-tree')
const {describeReducer} = require('../../utils/tests')
const actions = require('./actions')
const reducer = require('./reducer')

describeReducer(
  'MessageEditor reducer',
  createTree({text: reducer}),
  ({getState, dispatch}) => {
    test('is a function', () => {
      expect(typeof reducer).toBe('function')
    })

    describe('Initial state', () => {
      test('should have empty text', () => {
        expect(getState().text).toBeFalsy()
      })
    })

    describe('On change', () => {
      beforeEach(() => dispatch(actions.changeText('Edited message!')))

      test('should change', () => {
        expect(getState().text).toBe('Edited message!')
      })
    })

    describe('After sending message', () => {
      beforeEach(() => dispatch(actions.sendMessage('Sent message!')))

      test('should reset', () => {
        expect(getState().text).toBe('')
      })
    })
  }
)
