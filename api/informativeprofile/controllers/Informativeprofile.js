'use strict';

/**
 * Informativeprofile.js controller
 *
 * @description: A set of functions called "actions" for managing `Informativeprofile`.
 */

module.exports = {

  /**
   * Retrieve informativeprofile records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.informativeprofile.search(ctx.query);
    } else {
      return strapi.services.informativeprofile.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a informativeprofile record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.informativeprofile.fetch(ctx.params);
  },

  /**
   * Count informativeprofile records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.informativeprofile.count(ctx.query);
  },

  /**
   * Create a/an informativeprofile record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.informativeprofile.add(ctx.request.body);
  },

  /**
   * Update a/an informativeprofile record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.informativeprofile.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an informativeprofile record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.informativeprofile.remove(ctx.params);
  }
};
