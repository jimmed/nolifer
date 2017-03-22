const React = require('react')
const {shallow} = require('enzyme')
const MessageHistory = require('./')

const emptyMessages = []
const testMessages = [
  {sender: 'Jim', content: 'Hey there', timestamp: 0, key: 1},
  {sender: 'Joe', content: 'Alrighty!', timestamp: 1000, key: 2},
  {sender: 'Jay', content: 'Boom boom', timestamp: 2000, key: 3}
]

const emptyMessageText = 'It\'s a bit quiet in here!'

describe('MessageHistory dumb component', () => {
  let component
  let messages

  afterEach(() => {
    component = null
    messages = null
  })

  describe('with no messages', () => {
    beforeEach(() => {
      component = shallow(
        <MessageHistory messages={emptyMessages} />
      )
      messages = component.find(MessageHistory.Message)
    })

    it('should render a notice', () => {
      expect(component.text()).toBe(emptyMessageText)
    })
    it('should not contain any Messages', () => {
      expect(messages.length).toBe(0)
    })
  })

  describe('with several messages', () => {
    beforeEach(() => {
      component = shallow(
        <MessageHistory messages={testMessages} />
      )
      messages = component.find(MessageHistory.Message)
    })

    it('should render each message', () => {
      expect(messages.length).toBe(testMessages.length)
    })
  })
})
