const React = require('react')
const {range} = require('lodash')
const {storiesOf} = require('@kadira/storybook')
const MessageHistory = require('./')

const defaultMessages = [
  {sender: 'Jim', content: 'Hey there', timestamp: 0, id: 1},
  {sender: 'Joe', content: 'Alrighty!', timestamp: 1000, id: 2},
  {sender: 'Jay', content: 'Boom boom', timestamp: 2000, id: 3}
]

const allTheMessages = range(5000).map(i => ({
  ...defaultMessages[i % defaultMessages.length],
  timestamp: i * 1000,
  id: i + 1
}))

storiesOf('Component: Message History', module)
  .add('No messages', () => (
    <MessageHistory messages={[]} />
  ))
  .add('Some messages', () => (
    <MessageHistory messages={defaultMessages} />
  ))
  .add('ALL THE MESSAGES', () => (
    <MessageHistory messages={allTheMessages} />
  ))
