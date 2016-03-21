'use strict';

var m = require('mithril');
var Filters = require('./filters');
var ReduxComponent = require('./redux_component');
var Todo = require('./todo');
var constants = require('./constants');

module.exports = function () {
  var todos = ReduxComponent({
    defaultState: {
      todos: []
    }
  }, Array.from(arguments));

  var todo = Todo(todos);

  function toggleTodo(state, action) {
    if (state.id === action.id) {
      return Object.assign({}, state, { completed: !state.completed });
    }

    return state;
  }

  todos.registerAction(constants.TOGGLE_TODO, function (state, action) {
    state.todos = state.todos.map(function (todo) {
      return toggleTodo(todo, action);
    });

    return state;
  });

  todos.filter = function (todo) {
    switch(todos.state().filter) {
      case constants.ALL:
        return true;
      case constants.ACTIVE:
        return !todo.completed;
      case constants.COMPLETED:
        return todo.completed;
    }

    return false;
  };

  todos.view = function (scope) {
    return m('ul.todos',
      todos.state().todos
        .filter(todos.filter)
        .map(function (t) {
          return m.component(todo, t);
        })
    );
  };

  return todos;
};
