const { configure } = require('@kadira/storybook');
require('./style.css');

function loadStories() {
  require('../src/components/Timestamp/storybook');
  require('../src/components/MessageEditor/storybook');
  require('../src/components/MessageHistory/storybook');
}

configure(loadStories, module);
