const React = require('react');
const Timestamp = require('../Timestamp');
const style = require('./style.css');

class MessageHistory extends React.PureComponent {
  constructor(props) {
    super(props);
    this.captureLastMessage = this.captureLastMessage.bind(this);
  }

  captureLastMessage(ref) {
    this._lastMessage = ref;
  }

  scrollIntoView() {
    if (this._lastMessage) {
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
        {messages.length
          ? messages
              .slice(-1000)
              .map(message => (
                <MessageHistory.Message key={message.id} {...message} />
              ))
              .concat([
                <div
                  className={style.afterLastMessage}
                  key="afterLastMessage"
                  ref={this.captureLastMessage}
                />
              ])
          : <div className={style.noMessages}>
              <p>{"It's a bit quiet in here!"}</p>
            </div>}
      </div>
    );
  }
}

MessageHistory.Message = ({ sender, content, timestamp }) => (
  <div className={style.message}>
    <div className={style.sender}>{sender}</div>
    <div className={style.content}>{content}</div>
    <Timestamp className={style.timestamp} timestamp={timestamp} />
  </div>
);

MessageHistory.Message.propTypes = {
  sender: React.PropTypes.string.isRequired,
  content: React.PropTypes.string.isRequired,
  timestamp: React.PropTypes.number.isRequired
};

MessageHistory.propTypes = {
  messages: React.PropTypes.arrayOf(
    React.PropTypes.shape(MessageHistory.Message.propTypes)
  ).isRequired
};

module.exports = MessageHistory;
