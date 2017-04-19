const React = require('react');
const { range } = require('lodash');
const { storiesOf } = require('@kadira/storybook');
const subSeconds = require('date-fns/sub_seconds');
const Timestamp = require('./');

const secondsAgo = (x = 0) => +subSeconds(new Date(), x);

storiesOf('Component: Timestamp', module).add('Starting now', () => (
  <Timestamp timestamp={+Date.now()} />
));
