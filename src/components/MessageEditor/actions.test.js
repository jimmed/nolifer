const actions = require('./actions')

describe('MessageEditor actions', () => {
  describe('changeText', () => {
    it('should fire with the right payload', () => {
      const result = actions.changeText('edited text')
      expect(result).toEqual({
        type: 'CHANGE_TEXT',
        payload: 'edited text'
      })
    })
  })
  
  describe('sendMessage', () => {
    it('should fire with the right payload', () => {
      const result = actions.sendMessage('sent message')
      expect(result).toEqual({
        type: 'SEND_MESSAGE',
        payload: 'sent message'
      })
    })
  })
})
