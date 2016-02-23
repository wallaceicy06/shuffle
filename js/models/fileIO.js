define([
], function() {

  var outputFile = null;
  
  var parseNames = function (file, cb) {
    var reader = new FileReader();

    reader.onload = function (e) { 
      var lines = e.target.result.split('\n');
      var names = [];

      _.each(lines, function (line) {
        tokens = [];

        if (line.length === 0) {
          return;
        }

        if (file.type === 'text/csv') {
          tokens = line.split(',');
        } else if (file.type === 'text/tsv') {
          tokens = line.split('\t');
        } else {
          tokens.push(line);
        }

        var name;
        var value = null; 
  
        name = tokens[0];

        if (tokens.length >= 2)  {
          value = parseFloat(tokens[1]);
        }

        names.push({ name: name, value: value });
      });

      cb(names);
    }

    reader.readAsText(file);
  };

  var generateOutputFile = function (names) {
    var lines = _.map(names, function (card, index) {
      var humanIndex = index + 1;
      if (card.value === null) {
        return new String(humanIndex + '. ' + card.name + '\n');
      } else {
        return new String(humanIndex + '. ' + card.name + ' (' + card.value + ')\n');
      }
    });

    var data = new Blob(lines, { type: 'text/plain' });

    if (outputFile !== null) {
      window.URL.revokeObjectURL(outputFile);
    }

    outputFile = window.URL.createObjectURL(data);

    return outputFile;
  }

  return {
    parseNames: parseNames,
    generateOutputFile: generateOutputFile
  };
});
