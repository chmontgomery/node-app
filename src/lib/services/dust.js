var dust = require('dustjs-linkedin');
dust._templates = {};

//http://stackoverflow.com/questions/29304979/compiling-and-rendering-complex-dust-js-templates-on-the-client
//dust.onLoad = function(templateName, callback) {
//  callback(null, render[templateName]);
//};

// Set dust options here
dust.config.whitespace = true;  // dust is stupid about whitespace

module.exports = dust;
