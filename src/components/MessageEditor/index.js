const React = require('react');
const PropTypes = require('prop-types');
const style = require('./style.css');

function MessageEditor({ text = '', actions }) {
  return (
    <div className={style.container}>
      <MessageEditor.TextInput
        value={text}
        className={style.textInput}
        onChange={actions.changeText}
      />
      <MessageEditor.SendButton
        className={style.sendButton}
        onClick={actions.sendMessage.bind(null, text)}
      />
    </div>
  );
}

MessageEditor.propTypes = {
  text: PropTypes.string.isRequired,
  actions: PropTypes.shape({
    sendMessage: PropTypes.func.isRequired,
    changeText: PropTypes.func.isRequired
  }).isRequired
};

MessageEditor.TextInput = ({ value, className, onChange }) => {
  return (
    <input
      type="text"
      value={value}
      onInput={({ target }) => onChange(target.value)}
      className={className}
    />
  );
};

MessageEditor.TextInput.propTypes = {
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

MessageEditor.SendButton = ({ className, onClick }) => {
  return (
    <button type="button" onClick={onClick} className={className}>Send</button>
  );
};

MessageEditor.SendButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired
};

module.exports = MessageEditor;
