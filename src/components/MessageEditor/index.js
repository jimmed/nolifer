import React from 'react'
import { connect } from 'react-redux'
import style from './style.css'

export function MessageEditor ({ text = '', actions }) {
  return (
    <div className={style.container}>
      <TextInput
        value={text}
        className={style.textInput}
        onChange={newText => actions.changeText(newText)}
      />
      <SendButton
        className={style.sendButton}>
        onClick={() => actions.sendMessage(text)}
      />
    </div>
  )
}
