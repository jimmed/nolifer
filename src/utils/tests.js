const { createStore } = require('redux');

function describeReducer(name, reducer, tests) {
  let store;
  let state;

  const updateState = () => {
    state = store.getState();
  };

  const dispatch = action => {
    store.dispatch(action);
    updateState();
  };

  const getState = () => state;

  beforeEach(() => {
    store = createStore(reducer);
    updateState();
  });

  afterEach(() => {
    store = null;
    state = null;
  });

  tests({ dispatch, getState });
}

module.exports = {
  describeReducer
};
