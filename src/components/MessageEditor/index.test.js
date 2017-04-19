const React = require('react');
const { shallow } = require('enzyme');
const MessageEditor = require('./');

const defaultText = 'Default message';
const changedText = 'Edited message';

describe('MessageEditor dumb component', () => {
  let component;
  let textInput;
  let sendButton;
  let actions;

  beforeEach(() => {
    actions = {
      sendMessage: jest.fn(),
      changeText: jest.fn()
    };
    component = shallow(<MessageEditor text={defaultText} actions={actions} />);
    textInput = component.find(MessageEditor.TextInput);
    sendButton = component.find(MessageEditor.SendButton);
  });

  afterEach(() => {
    component = null;
    textInput = null;
    sendButton = null;
    actions = null;
  });

  it('should render something', () => expect(component).toBeTruthy());

  it('should render the given text', () => {
    expect(textInput.props().value).toBe(defaultText);
  });

  it('should fire a text change action', () => {
    textInput.props().onChange(changedText);
    expect(actions.changeText.mock.calls.length).toBe(1);
    expect(actions.changeText.mock.calls[0][0]).toBe(changedText);
  });

  it('should fire a send message action', () => {
    sendButton.props().onClick();
    expect(actions.sendMessage.mock.calls.length).toBe(1);
    expect(actions.sendMessage.mock.calls[0][0]).toBe(defaultText);
  });
});
