var _ = require('lodash');
var $ = require('jquery');

module.exports = function (events) {
  _.each(events, function (handler, k) {
    var parts = k.split(' ');
    var selector = parts[1],
        eventType = parts[0];

    $(this.el).on(eventType, selector, this[handler].bind(this));
  }, this);
};
