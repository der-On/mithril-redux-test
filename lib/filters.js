'use strict';

var m = require('mithril');
var ReduxComponent = require('./redux_component');
var Filter = require('./filter');
var constants = require('./constants');

module.exports = function () {
  var filters = ReduxComponent({
    defaultState: {
      filter: constants.ALL
    }
  }, Array.from(arguments));

  var filterLinks = [];

  filters.registerAction(constants.SET_FILTER, function (state, action) {
    return Object.assign(state, {
      filter: action.value
    });
  });

  filterLinks.push(
    Filter(filters, { filter: constants.ALL, label: 'All' })
  );
  filterLinks.push(
    Filter(filters, { filter: constants.ACTIVE, label: 'Active' })
  );
  filterLinks.push(
    Filter(filters, { filter: constants.COMPLETED, label: 'Completed' })
  );

  filters.view = function (scope) {
    return m('.filters',
      filterLinks.map(function (filterLink) {
        return [m.component(filterLink), ' '];
      })
    );
  };

  return filters;
};
