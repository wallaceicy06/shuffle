define([
  'jquery',
  'lodash',
  'views/main',
], function ($, _, view) {
  var init = function () {
    view.init();
  }

  return {
    init: init
  };
});
