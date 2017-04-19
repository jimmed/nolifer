const React = require('react');
const PropTypes = require('prop-types');
const cx = require('classnames');
const Timestamp = require('../Timestamp');
const style = require('./style.css');

class MessageHistory extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.scrollIntoView = this.scrollIntoView.bind(this);
    this.state = { scrolledUp: false };
  }

  handleScroll(event) {
    const { target: { scrollTop, clientHeight, scrollHeight } } = event;
    this.scrolledUp = scrollTop + clientHeight < scrollHeight;
    this.setState(() => ({
      scrolledUp: this.scrolledUp
    }));
  }

  scrollIntoView(force = false) {
    if (this._lastMessage && (!this.scrolledUp || force)) {
      this._lastMessage.scrollIntoView({ behavior: 'smooth' });
    }
  }

  componentDidMount() {
    this.scrollIntoView();
  }

  componentDidUpdate() {
    this.scrollIntoView();
  }

  render() {
    const { messages } = this.props;
    return (
      <div className={style.container}>
        <div className={style.scrollContainer} onScroll={this.handleScroll}>
          {messages.length
            ? groupMessages(messages.slice(-1000))
                .map(group => (
                  <MessageHistory.MessageGroup key={group.id} {...group} />
                ))
                .concat([
                  <div
                    className={style.afterLastMessage}
                    key="afterLastMessage"
                    ref={ref => this._lastMessage = ref}
                  />
                ])
            : <div className={style.noMessages}>
                <p>{"It's a bit quiet in here!"}</p>
              </div>}
        </div>
        <div
          className={cx(style.scrolledUp, this.scrolledUp && style.visible)}
          onClick={() => this.scrollIntoView(true)}
        >
          Scroll down to latest
        </div>
      </div>
    );
  }
}

function groupMessages(messages) {
  let lastId = 0;
  return messages.reduce((groups, message, i) => {
    const lastGroup = groups[groups.length - 1];

    const lastMessage =
      lastGroup && lastGroup.messages[lastGroup.messages.length - 1];

    const shouldCreateNewGroup =
      !lastGroup ||
      lastGroup.sender !== message.sender ||
      lastMessage.timestamp + 30000 < message.timestamp;

    if (shouldCreateNewGroup) {
      groups.push({
        id: ++lastId,
        sender: message.sender,
        messages: [message]
      });
    } else {
      lastGroup.messages.push(message);
    }
    return groups;
  }, []);
}

MessageHistory.Message = ({ content, timestamp }) => (
  <div className={style.message}>
    <div className={style.messageContent}>{content}</div>
    <Timestamp className={style.timestamp} timestamp={timestamp} />
  </div>
);

MessageHistory.Message.propTypes = {
  content: PropTypes.node.isRequired,
  timestamp: Timestamp.propTypes.timestamp
};

MessageHistory.MessageGroup = ({ sender, messages }) => (
  <div className={style.messageGroup}>
    <div className={style.sender}>{sender}</div>
    <div className={style.content}>
      {messages.map(message => (
        <MessageHistory.Message key={message.id} {...message} />
      ))}
    </div>
  </div>
);

MessageHistory.MessageGroup.propTypes = {
  sender: PropTypes.node.isRequired,
  messages: PropTypes.arrayOf(PropTypes.shape(MessageHistory.Message.propTypes))
};

MessageHistory.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape(MessageHistory.Message.propTypes))
    .isRequired
};

module.exports = MessageHistory;
