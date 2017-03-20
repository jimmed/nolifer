import React from 'react'
import style from './style.css'

function MessageEditor({text = '', actions}) {
  return (
    <div className={style.container}>
      <TextInput
        value={text}
        className={style.textInput}
        onChange={actions.changeText}
      />
      <SendButton
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

function TextInput({value, className, onChange}) {
  return (
    <input
      type="text"
      value={value}
      onInput={({target}) => onChange(target.value)}
      className={className}
    />
  )
}

TextInput.propTypes = {
  value: React.PropTypes.string.isRequired,
  className: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired
}

function SendButton({className, onClick}) {
  return (
    <button type="button" onClick={onClick} className={className}>Send</button>
  )
}

SendButton.propTypes = {
  className: React.PropTypes.string,
  onClick: React.PropTypes.func.isRequired
}

module.exports = MessageEditor
