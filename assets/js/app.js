var NAMES_DELAY = 100;
var CARD_TEMPLATE = _.template('<div class="col s12 m12"><div class="name-card card-panel teal"><span class="white-text"><%- title %></span><span class="right white-text"><%- 5.0 %></span></div></div>');


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
