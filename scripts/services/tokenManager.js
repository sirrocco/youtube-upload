var jsonfile = require('jsonfile'),
    _existingToken = null;

module.exports = {
  load: function(callback) {
    if (_existingToken) {
      callback(_existingToken);
      return;
    }

    jsonfile.readFile('./token.json', function(err, obj) {
      if (!err) {
        _existingToken = obj;
      }

      callback(_existingToken);
    });
  },

  save: function(token) {
    _existingToken = token;
    jsonfile.writeFile('./token.json', token);
  },
};
