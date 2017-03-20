const {createActions} = require('redux-actions')

const actions = {
  CHANGE_TEXT: payload => payload,
  SEND_MESSAGE: payload => payload.trim()
}

module.exports = createActions(actions)
module.exports.actions = actions
