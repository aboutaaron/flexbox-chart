'use strict';

var App = App || {};

jQuery(document).ready(function($) {
  var $bars = $('.timeline').find('.bar');

  $.each($bars, function (index, bar) {
    var barHeight = $(bar).find('a').height(),
        dataHeight = $(bar).find('a .count').height();

    $(bar).find('.count').css('margin-top', (barHeight - dataHeight));
  });
});