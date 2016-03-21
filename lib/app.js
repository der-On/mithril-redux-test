'use strict';

var m = require('mithril');
var logger = require('./logger');
var ReduxComponent = require('./redux_component');
var Todos = require('./todos');
var AddTodo = require('./add_todo');
var Filters = require('./filters');
var Logger = require('./logger');
var TimeTravel = require('./time_travel');

module.exports = function () {
  // we create a ReduxComponent using the passed in arguments
  var app = ReduxComponent(null, Array.from(arguments));

  // we create to equal, but seperate todo apps
  var todoApp1, todoApp2;
  var opts1 = { namespace: 'todoApp1' };
  var opts2 = { namespace: 'todoApp2' };

  todoApp1 = {
    todos: Todos(app, opts1),
    addTodo: AddTodo(app, opts1),
    filters: Filters(app, opts1)
  };

  todoApp2 = {
    todos: Todos(app, opts2),
    addTodo: AddTodo(app, opts2),
    filters: Filters(app, opts2),
  };

  // we want to log each action using the logger reducer
  app.registerReducer(Logger());
  var timeTravel = TimeTravel(app);

  // finally we render our todo apps
  app.view = function (scope) {
    return [
      m.component(timeTravel),

      m('h1', 'Todo App 1'),
      m.component(todoApp1.addTodo),
      m.component(todoApp1.todos),
      m.component(todoApp1.filters),

      m('h1', 'Todo App 2'),
      m.component(todoApp2.addTodo),
      m.component(todoApp2.todos),
      m.component(todoApp2.filters)
    ];
  };

  return app;
};
