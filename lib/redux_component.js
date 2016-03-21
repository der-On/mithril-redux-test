'use strict';

var m = require('mithril');

module.exports = function (component, args) {
  component = component || {};
  var parent = args[0] || null;
  var opts = args[1] || {};

  component.actionPrefix = '';

  var reducers = [];

  function registerAsChild(parent, opts) {
    opts = opts || {};
    component.store = opts.store || parent.store;
    component.actionPrefix = parent.actionPrefix + (opts.namespace ? opts.namespace + '.' : '');
    component.parent = parent;

    // create empty namespace
    if (opts.namespace) {
      var state = parent.state();
      if (!state[opts.namespace]) {
        state[opts.namespace] = {};
      }
    }

    component.state = function () {
      var state = parent.state();

      if (opts.namespace) {
        return state[opts.namespace];
      }

      return state;
    };

    // extend state with defaults
    if (component.defaultState) {
      Object.assign(component.state(), component.defaultState);
    }

    // register our reducer in the parent
    parent.registerReducer(component.reducer, { namespace: opts.namespace });
  }

  component.reducer = function (state, action) {
    state = state || component.defaultState || null;

    function executeReducer(nextState, reducer) {
      if (reducer.namespace) {
        nextState[reducer.namespace] = reducer.fn(nextState[reducer.namespace], action);
      } else {
        nextState = reducer.fn(nextState, action);
      }

      return nextState;
    }

    return Object.assign({}, state, reducers.reduce(executeReducer, state));
  };

  component.registerReducer = function (reducer, opts) {
    opts = opts || {};
    opts.fn = reducer;
    reducers.push(opts);
  };

  component.registerAction = function (type, handler) {
    component.registerReducer(function (state, action) {
      state = state || component.defaultState || null;

      if (action.type === component.actionPrefix + type) {
        return handler(state, action);
      }
    });
  };

  component.state = function () {
    return component.store ?
      component.store.getState() : {};
  };

  component.dispatch = function (action) {
    action.type = component.actionPrefix + action.type;
    component.store.dispatch(action);
  };

  component.controller = component.controller || function () {};
  component.view = component.view || function () {};

  if (opts.store) {
    component.store = opts.store;
    component.store.replaceReducer(component.reducer);
  }

  if (parent) {
    registerAsChild(parent, opts);
  }

  return component;
};
