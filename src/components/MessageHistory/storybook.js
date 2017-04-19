const React = require('react');
const { range } = require('lodash');
const { storiesOf } = require('@kadira/storybook');
const subSeconds = require('date-fns/sub_seconds');
const MessageHistory = require('./');

const secondsAgo = (x = 0) => +subSeconds(new Date(), x);

const defaultMessages = [
  { sender: 'Jim', content: 'Hey there', timestamp: secondsAgo(45), id: 1 },
  { sender: 'Joe', content: 'Alrighty!', timestamp: secondsAgo(30), id: 2 },
  { sender: 'Jay', content: 'Boom boom', timestamp: secondsAgo(15), id: 3 }
];

const allTheMessages = range(5000).map(i => ({
  ...defaultMessages[i % defaultMessages.length],
  timestamp: secondsAgo((5000 - i) * 15 + Math.random() * 15),
  id: i + 1
}));

storiesOf('Component: Message History', module)
  .add('No messages', () => <MessageHistory messages={[]} />)
  .add('Some messages', () => <MessageHistory messages={defaultMessages} />)
  .add('ALL THE MESSAGES', () => <MessageHistory messages={allTheMessages} />)
  .add('Live updating example', () => <LiveUpdatingExample />);

class LiveUpdatingExample extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { messages: allTheMessages };
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(({ messages }) => {
        const lastMessage = messages[messages.length - 1];
        const { sender, content } = defaultMessages[
          (lastMessage.id - 1) % defaultMessages.length
        ];
        return {
          messages: messages.concat([
            {
              sender,
              content,
              timestamp: secondsAgo(),
              id: lastMessage.id + 1
            }
          ])
        };
      });
    }, 500);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return <MessageHistory messages={this.state.messages} />;
  }
}
