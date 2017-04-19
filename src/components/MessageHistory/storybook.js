const React = require('react');
const { range } = require('lodash');
const { storiesOf } = require('@kadira/storybook');
const subSeconds = require('date-fns/sub_seconds');
const DemoMessageHistory = require('./demo');
const MessageHistory = require('./');

const secondsAgo = (x = 0) => +subSeconds(new Date(), x);

const defaultMessages = [
  { sender: 'Jim', content: 'Hey there' },
  { sender: 'Jim', content: "How's it going?" },
  { sender: 'Jim', content: 'This is exciting' },
  { sender: 'Joe', content: 'Alrighty!' },
  { sender: 'Joe', content: 'Not bad mate!' },
  { sender: 'Jay', content: 'Just a quick joke' },
  { sender: 'Joe', content: 'Plz no' }
].map((item, id) => ({ ...item, id: id + 1, timestamp: secondsAgo(id * 15) }));

const allTheMessages = range(5000).map(i => ({
  ...defaultMessages[i % defaultMessages.length],
  timestamp: secondsAgo((5000 - i) * 15 + Math.random() * 15),
  id: i + 1
}));

storiesOf('Component: Message History', module)
  .add('No messages', () => <MessageHistory messages={[]} />)
  .add('Some messages', () => <MessageHistory messages={defaultMessages} />)
  .add('ALL THE MESSAGES', () => <MessageHistory messages={allTheMessages} />)
  .add('Live updating example', () => (
    <DemoMessageHistory
      messages={defaultMessages}
      minDelay={100}
      maxDelay={1000}
    />
  ));
