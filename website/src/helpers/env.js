'use strict';

module.exports.register = function (Handlebars) {
  Handlebars.registerHelper('env', function (name) {
    return process.env[name] || '';
  });
};
