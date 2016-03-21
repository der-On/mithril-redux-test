'use strict';

var m = require('mithril');
var ReduxComponent = require('./redux_component');
var constants = require('./constants');

module.exports = function () {
  var addTodo = ReduxComponent(null, Array.from(arguments));

  function createTodo(text){
    return {
      id: addTodo.state().todos.length,
      text: text
    };
  }

  addTodo.registerAction(constants.ADD_TODO, function (state, action) {
    state.todos = state.todos.slice(0)
      .concat(createTodo(action.text));

    return state;
  });

  addTodo.controller = function () {
    var scope = {};

    scope.text = '';

    scope.add = function (e) {
      e.preventDefault();

      addTodo.dispatch({
        type: constants.ADD_TODO,
        text: scope.text
      });

      scope.text = '';
    };

    scope.setText = function (value) {
      scope.text = value;
    };

    return scope;
  };

  addTodo.view = function (scope) {
    return m('.add-todo', [
      m('input[type="text"]', {
        value: scope.text,
        oninput: m.withAttr('value', scope.setText)
      }),
      m('button', {
        onclick: scope.add
      }, 'Add Todo')
    ]);
  };

  return addTodo;
};
