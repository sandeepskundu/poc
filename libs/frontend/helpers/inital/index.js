const comps = require('./components');

const initializer = (n, h) => {
  window[n || 'helpers'] = h;

  setTimeout(() => {comps.bind(h)}, 200);
  h.plugins.tooltip.bind()
};


exports.init = initializer;
exports.components = comps;