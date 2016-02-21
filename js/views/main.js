define([
  'jquery',
  'lodash',
  'materialize'
], function ($, _, materialize) {
  var allCards = [];
  var outputFile = null;
  var NAMES_DELAY = 100;
  var CARD_TEMPLATE = _.template('<div class="animated <%= animation %> name-card col s12 m12"><div class="name-card card-panel teal"><span class="white-text"><%- title %></span><span class="right white-text"><%- value %></span></div></div>');
  var ANIMATION_END = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

  $.fn.extend({
    animateCss: function (animationName, callback) {
      $(this).addClass('animated ' + animationName).one(ANIMATION_END, function() {
      $(this).removeClass('animated ' + animationName);
        callback();
      });
    }
  });

  function init() {
    $('.modal-trigger').leanModal();
    $('select').material_select();
    $('.button-collapse').sideNav();

    setGoButtonEnabled(true);
    
    $('#btn-import').click(function () {
      var fileChooser = document.getElementById('file-chooser');

      if (fileChooser.files.length == 0) {
        return;
      }

      var file = fileChooser.files[0];
      document.getElementById('file-form').reset();

      if (file.type !== 'text/csv' && file.type !== 'text/tsv') {
        return;
      }

      importNames(file, function (names) {
        allCards = _.concat(allCards, names);
        addAllCards(allCards, 0, 'lightSpeedIn', function() {});
      });
    });
  }

  function importNames(file, cb) {
    var reader = new FileReader();
    reader.onload = function (e) { 
      var lines = e.target.result.split('\n');
      var names = [];

      _.each(lines, function (line) {
        tokens = [];

        if (file.type === 'text/csv') {
          tokens = line.split(',');
        } else if (file.type === 'text/tsv') {
          tokens = line.split('\t');
        }

        if (tokens.length < 2) {
          return;
        } 

        var name = tokens[0];
        var value = parseFloat(tokens[1]);
        
        names.push({ name: name, value: value });
      });

      cb(names);
    }

    reader.readAsText(file);
  }

  function setGoButtonEnabled(enabled) {
    if (enabled) {
      $('#btn-go').click(function () {
        setGoButtonEnabled(false);
        runShuffle(function () { setGoButtonEnabled(true); });
      }).removeClass('disabled');
    } else {
      $('#btn-go').unbind('click').addClass('disabled');
    }
  }

  function shuffleCardsByPriority(cards) {
    var groupedCards = _.groupBy(cards, 'value');

    var shuffledGroups = _.mapValues(groupedCards, function(group) { return _.shuffle(group) });

    var shuffledCards = [];
    _.each(_.sortBy(_.keys(shuffledGroups)).reverse(), function(k) {
      [].push.apply(shuffledCards, shuffledGroups[k]); 
    });

    return shuffledCards;
  }

  function runShuffle(cb) {
    var delay = parseFloat(document.getElementById('delay').value) * 1000;
    var order = document.getElementById('selectOrder').value;

    removeAllCards(function () { 
      var shuffled = shuffleCardsByPriority(allCards);

      if (order === 'ascending') {
        shuffled = shuffled.reverse();
      }
      
      addAllCards(shuffled, delay, 'fadeInUp', cb);
      makeOutputFile(shuffled);
    });
  }

  function makeOutputFile(shuffled) {
    var lines = _.map(shuffled, function (card, index) {
      var humanIndex = index + 1;
      return new String(humanIndex + '. ' + card.name + ' (' + card.value + ')\n');
    });

    var data = new Blob(lines, { type: 'text/plain' });

    if (outputFile !== null) {
      window.URL.revokeObjectURL(outputFile);
    }

    outputFile = window.URL.createObjectURL(data);

    document.getElementById('downloadLink').href = outputFile;
  }

  function addCard(title, value) {
    var $cardsList = $('#cards-list');

    $cardsList.append(CARD_TEMPLATE({title: title, value: value}));
  }

  function scrollToBottom() {
    $(window).scrollTop($(window).height());
  }

  function addAllCards(cards, delay, animation, cb) {
    var $cardsList = $('#cards-list');

    var animations = [];
    _.each(cards, function(card, index) {
      var a = new Promise(function (resolve) {
        setTimeout(function () {
          var $newElement = $cardsList.append(
              CARD_TEMPLATE({ title: card.name, 
                              value: card.value,
                              animation: animation })
          );
      
          $newElement.one(ANIMATION_END, function() { resolve(); });
      
          scrollToBottom();
        }, delay * index); 
      });

      animations.push(a);
    }); 

    Promise.all(animations).then(function() {
      cb();
    });
  }

  function removeAllCards(cb) {
    var $names = $('.name-card');

    var animations = [];
    $names.each(function (index, name) {
      var a = new Promise(function (resolve) {
        setTimeout(function () {
          $(name).animateCss('bounceOut', function() {
            $(name).css('opacity', '0');
            resolve();
          });
        }, (NAMES_DELAY * Math.random() * 5));
      });

      animations.push(a);
    });

    Promise.all(animations).then(function() {
      $names.remove();
      cb();
    });
  }

  return {
    init: init
  };
});
