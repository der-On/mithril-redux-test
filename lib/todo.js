'use strict';

var m = require('mithril');
var ReduxComponent = require('./redux_component');
var constants = require('./constants');

module.exports = function () {
  var todo = ReduxComponent(null, Array.from(arguments));

  todo.controller = function () {
    var scope = {};

    scope.toggleTodo = function (todoId) {
      return function (e) {
        e.preventDefault();

        todo.dispatch({
          type: constants.TOGGLE_TODO,
          id: todoId
        });
      };
    };

    return scope;
  };

  todo.view = function (scope, todo) {
    return m('li.todo', {
      style: todo.completed ? 'text-decoration: line-through;' : 'text-decoration: none;'
    }, m('a', {
        href: 'javascript:;',
        onclick: scope.toggleTodo(todo.id)
      }, todo.text)
    );
  };

  return todo;
};
