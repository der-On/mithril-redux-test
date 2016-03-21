'use strict';
var m = require('mithril');
var redux = require('redux');

// we first create a store with a noop reducer
var store = redux.createStore(
  function (state, action) {
    return state
  }, {}
);

// then we register the top level app and tell it to use our store
// it will apply it's own reducer to the store
var app = require('./app')(null, { store: store });

// now we mount our app to the document
m.mount(
  document.getElementById('app'),
  app
);
