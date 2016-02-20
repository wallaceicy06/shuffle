var NAMES_DELAY = 100;
var CARD_TEMPLATE = _.template('<div class="animated lightSpeedIn name-card col s12 m12"><div class="name-card card-panel teal"><span class="white-text"><%- title %></span><span class="right white-text"><%- value %></span></div></div>');

$.fn.extend({
  animateCss: function (animationName, callback) {
    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    $(this).addClass('animated ' + animationName).one(animationEnd, function() {
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
      _.each(names, function (n) {
        addCard(n.name, n.value); 
      });
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
    $('#btn-go').click(removeAllCards).removeClass('disabled');
  } else {
    $('#btn-go').unbind('click').addClass('disabled');
  }
}

function addCard(title, value) {
  var $cardsList = $('#cards-list');

  $cardsList.append(CARD_TEMPLATE({title: title, value: value}));
}

function removeAllCards() {
  setGoButtonEnabled(false);
  var $names = $('.name-card');

  var animations = [];
  $names.each(function (index, name) {
    var a = new Promise(function (resolve) {
      setTimeout(function() {
        $(name).animateCss('bounceOut', function() {
          $(name).css('opacity', '0');
          resolve();
        });
      }, NAMES_DELAY * index);
    });

    animations.push(a);
  });

  Promise.all(animations).then(function() {
    $names.remove();
    setGoButtonEnabled(true);
  });
}

$(document).ready(function() {
  init();
});
