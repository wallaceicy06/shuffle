define([
  'lodash'
], function (_) {
  var allCards = [];
  var listeners = [];
  
  var add = function (name, value) {
    allCards.push({ name: name, value: value });
  };

  var all = function () {
    return allCards;
  };

  var clear = function() {
    allCards = [];
  };
  
  var shuffleByPriority = function () {
    var groupedCards = _.groupBy(allCards, 'value');

    var shuffledGroups = _.mapValues(groupedCards, function(group) { 
      return _.shuffle(group) 
    });

    var shuffledCards = [];
    _.each(_.sortBy(_.keys(shuffledGroups)).reverse(), function(k) {
      [].push.apply(shuffledCards, shuffledGroups[k]); 
    });

    return shuffledCards;
  };

  return {
    add: add,
    clear: clear,
    all: all,
    shuffleByPriority: shuffleByPriority
  }; 
});
