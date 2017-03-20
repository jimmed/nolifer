const { configure } = require('@kadira/storybook')

function loadStories() {
  require('../src/components/MessageEditor/storybook')
}

configure(loadStories, module)
