require.config({
  paths: {
    jquery: 'http://cdn.jsdelivr.net/jquery/2.2.0/jquery.min',
    lodash: 'http://cdn.jsdelivr.net/lodash/4.5.0/lodash.min',
    materialize: 'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.5/js/materialize.min'
  },
  shim: {
    materialize: {
      deps: ['jquery']
    }
  }
});

require([
  'app',
], function (app) {
  app.init();
});
