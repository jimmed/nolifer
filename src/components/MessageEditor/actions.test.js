const actions = require('./actions');
const exampleText = 'example text';
describe('MessageEditor actions', () => {
  describe('changeText', () => {
    it('should fire with the right payload', () => {
      const result = actions.changeText(exampleText);
      expect(result).toEqual({
        type: 'CHANGE_TEXT',
        payload: exampleText
      });
    });
  });

  describe('sendMessage', () => {
    it('should fire with the right payload', () => {
      const result = actions.sendMessage(exampleText);
      expect(result).toEqual({
        type: 'SEND_MESSAGE',
        payload: exampleText
      });
    });
    it('should trim input', () => {
      const result = actions.sendMessage(`      ${exampleText}     `);
      expect(result).toEqual({
        type: 'SEND_MESSAGE',
        payload: exampleText
      });
    });
  });
});
