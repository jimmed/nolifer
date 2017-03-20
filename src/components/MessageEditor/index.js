const React = require('react')
const style = require('./style.css')

function MessageEditor({text = '', actions}) {
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
  )
}

MessageEditor.propTypes = {
  text: React.PropTypes.string.isRequired,
  actions: React.PropTypes.shape({
    sendMessage: React.PropTypes.func.isRequired,
    changeText: React.PropTypes.func.isRequired
  }).isRequired
}

MessageEditor.TextInput = ({value, className, onChange}) => {
  return (
    <input
      type="text"
      value={value}
      onInput={({target}) => onChange(target.value)}
      className={className}
    />
  )
}

MessageEditor.TextInput.propTypes = {
  value: React.PropTypes.string.isRequired,
  className: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired
}

MessageEditor.SendButton = ({className, onClick}) => {
  return (
    <button type="button" onClick={onClick} className={className}>Send</button>
  )
}

MessageEditor.SendButton.propTypes = {
  className: React.PropTypes.string,
  onClick: React.PropTypes.func.isRequired
}

module.exports = MessageEditor
