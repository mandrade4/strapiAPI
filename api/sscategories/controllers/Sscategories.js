'use strict';

/**
 * Sscategories.js controller
 *
 * @description: A set of functions called "actions" for managing `Sscategories`.
 */

module.exports = {

  /**
   * Retrieve sscategories records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.sscategories.search(ctx.query);
    } else {
      return strapi.services.sscategories.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a sscategories record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.sscategories.fetch(ctx.params);
  },

  /**
   * Count sscategories records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.sscategories.count(ctx.query);
  },

  /**
   * Create a/an sscategories record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.sscategories.add(ctx.request.body);
  },

  /**
   * Update a/an sscategories record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.sscategories.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an sscategories record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.sscategories.remove(ctx.params);
  }
};
