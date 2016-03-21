'use strict';

module.exports = function () {
  return function (state, action) {
    console.log(new Date());
    console.log(action);
    console.log(state);
    console.log('-----------------');

    return state;
  };
};
