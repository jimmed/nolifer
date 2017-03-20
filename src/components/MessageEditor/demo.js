const React = require('react')
const {createStore, bindActionCreators} = require('redux')
const {Provider, connect} = require('react-redux')
const {createTree} = require('redux-tree')

const actions = require('./actions')
const reducerBranch = require('./reducer')

const MessageEditor = require('./')

const reducer = createTree({text: reducerBranch})

const store = createStore(reducer)

const DemoMessageEditor = connect(
  state => ({text: state.text}),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(MessageEditor)

module.exports = props => (
  <Provider store={store}>
    <DemoMessageEditor {...props}/>
  </Provider>
)
