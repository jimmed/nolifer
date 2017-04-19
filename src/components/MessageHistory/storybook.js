const React = require('react')
const {range} = require('lodash')
const {storiesOf} = require('@kadira/storybook')
const subSeconds = require('date-fns/sub_seconds')
const MessageHistory = require('./')

const secondsAgo = x => +subSeconds(new Date(), x)

const defaultMessages = [
  {sender: 'Jim', content: 'Hey there', timestamp: secondsAgo(45), id: 1},
  {sender: 'Joe', content: 'Alrighty!', timestamp: secondsAgo(30), id: 2},
  {sender: 'Jay', content: 'Boom boom', timestamp: secondsAgo(15), id: 3}
]

const allTheMessages = range(5000).map(i => ({
  ...defaultMessages[i % defaultMessages.length],
  timestamp: secondsAgo((5000 - i) * 15 + Math.random() * 15),
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
