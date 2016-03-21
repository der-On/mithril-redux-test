'use strict';

var m = require('mithril');
var ReduxComponent = require('./redux_component');
var constants = require('./constants');

module.exports = function (parent, opts) {
  var filter = ReduxComponent(null, Array.from(arguments));

  filter.controller = function () {
    var scope = {};

    scope.setFilter = function (e) {
      e.preventDefault();

      filter.dispatch({
        type: constants.SET_FILTER,
        value: opts.filter
      });
    };

    return scope;
  };

  filter.view = function (scope) {
    return filter.state().filter === opts.filter ?
      m('span.filter', opts.label)
    : m('a.filter', {
      href: 'javascript:;',
      onclick: scope.setFilter
    }, opts.label);
  };

  return filter;
};
