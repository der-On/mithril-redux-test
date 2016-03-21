'use strict';

var m = require('mithril');
var ReduxComponent = require('./redux_component');

var BACKWARD = 'BACKWARD';
var FORWARD = 'FORWARD';

module.exports = function () {
  var timeTravel = ReduxComponent(null, Array.from(arguments));
  var history = [Object.assign({}, timeTravel.store.getState())];
  var historyIndex = history.length - 1;

  timeTravel.registerReducer(function (state, action) {
    switch(action.type) {
      case BACKWARD:
        historyIndex = Math.max(0, --historyIndex);
        return history[historyIndex];
      case FORWARD:
        historyIndex = Math.min(history.length - 1, ++historyIndex);
        return history[historyIndex];
      default:
        history.push(Object.assign({}, state));
        historyIndex = history.length - 1;
        return state;
    }
  });

  timeTravel.controller = function () {
    var scope = {};

    scope.forward = function (e) {
      e.preventDefault();
      timeTravel.dispatch({
        type: FORWARD
      });
    };

    scope.backward = function (e) {
      e.preventDefault();
      timeTravel.dispatch({
        type: BACKWARD
      });
    };

    return scope;
  };

  timeTravel.view = function (scope) {
    return m('.time-travel', [
      m('button' + (historyIndex > 0 ? '' : '[disabled]'), {
        onclick: scope.backward
      }, 'Undo'),
      ' ',
      m('button' + (historyIndex < history.length - 1 ? '' : '[disabled]'), {
        onclick: scope.forward
      }, 'Redo')
    ]);
  };

  return timeTravel;
};
