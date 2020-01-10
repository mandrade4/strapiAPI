'use strict';

/**
 * A set of functions called "actions" for `Hello`
 */

module.exports = {
  // GET /hello
  index: async ctx => {
    ctx.send('Hola yonick');
  },
};
