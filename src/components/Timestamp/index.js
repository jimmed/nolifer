const React = require('react');
const distanceInWordsStrict = require('date-fns/distance_in_words_strict');
const parseDate = require('date-fns/parse');

const subscribers = {};
let lastSubscriberId = 0;
let tickInterval;

const getSubscribers = () => Object.keys(subscribers).map(i => subscribers[i]);

const startTicking = () =>
  tickInterval = setInterval(() => getSubscribers().map(fn => fn()), 1000);
const stopTicking = () => clearInterval(tickInterval);

const subscribeToTick = updateComponent => {
  const existingSubscribers = getSubscribers();
  const subscriberId = ++lastSubscriberId;
  subscribers[subscriberId] = updateComponent;
  if (!existingSubscribers.length) {
    startTicking();
  }
  return function unsubscribeFromTick() {
    delete subscribers[subscriberId];
    if (!getSubscribers().length) {
      stopTicking();
    }
  };
};

const defaultFormatTitle = timestamp => parseDate(timestamp).toLocaleString();
const defaultFormatText = timestamp =>
  distanceInWordsStrict(Date.now(), timestamp, {
    addSuffix: true,
    includeSeconds: true
  });

class Timestamp extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = this.stateFromProps(props);
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    this._unsubscribeFromTick = subscribeToTick(this.update);
  }

  componentWillUnmount() {
    if (this._unsubscribeFromTick) {
      this._unsubscribeFromTick();
    }
  }

  componentWillReceiveProps(newProps) {
    this.update(newProps);
  }

  update(props = this.props) {
    this.setState(() => this.stateFromProps(props));
  }

  stateFromProps({
    timestamp,
    formatTitle = defaultFormatTitle,
    formatText = defaultFormatText
  }) {
    return {
      title: formatTitle(timestamp),
      text: formatText(timestamp)
    };
  }

  render() {
    const { title, text } = this.state;
    const { className } = this.props;
    return <span className={className} title={title}>{text}</span>;
  }
}

module.exports = Timestamp;
