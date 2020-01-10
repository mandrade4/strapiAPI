'use strict';

/* global Informativeprofile */

/**
 * Informativeprofile.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');
const { convertRestQueryParams, buildQuery } = require('strapi-utils');

module.exports = {

  /**
   * Promise to fetch all informativeprofiles.
   *
   * @return {Promise}
   */

  fetchAll: (params, populate) => {
    const filters = convertRestQueryParams(params);
    const populateOpt = populate || Informativeprofile.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)

    return buildQuery({
      model: Informativeprofile,
      filters,
      populate: populateOpt,
    });
  },

  /**
   * Promise to fetch a/an informativeprofile.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    // Select field to populate.
    const populate = Informativeprofile.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return Informativeprofile
      .findOne(_.pick(params, _.keys(Informativeprofile.schema.paths)))
      .populate(populate);
  },

  /**
   * Promise to count informativeprofiles.
   *
   * @return {Promise}
   */

  count: (params) => {
    const filters = convertRestQueryParams(params);

    return buildQuery({
      model: Informativeprofile,
      filters: { where: filters.where },
    })
      .count()
  },

  /**
   * Promise to add a/an informativeprofile.
   *
   * @return {Promise}
   */

  add: async (values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Informativeprofile.associations.map(ast => ast.alias));
    const data = _.omit(values, Informativeprofile.associations.map(ast => ast.alias));

    // Create entry with no-relational data.
    const entry = await Informativeprofile.create(data);

    // Create relational data and return the entry.
    return Informativeprofile.updateRelations({ _id: entry.id, values: relations });
  },

  /**
   * Promise to edit a/an informativeprofile.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Informativeprofile.associations.map(a => a.alias));
    const data = _.omit(values, Informativeprofile.associations.map(a => a.alias));

    // Update entry with no-relational data.
    const entry = await Informativeprofile.updateOne(params, data, { multi: true });

    // Update relational data and return the entry.
    return Informativeprofile.updateRelations(Object.assign(params, { values: relations }));
  },

  /**
   * Promise to remove a/an informativeprofile.
   *
   * @return {Promise}
   */

  remove: async params => {
    // Select field to populate.
    const populate = Informativeprofile.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Informativeprofile
      .findOneAndRemove(params, {})
      .populate(populate);

    if (!data) {
      return data;
    }

    await Promise.all(
      Informativeprofile.associations.map(async association => {
        if (!association.via || !data._id || association.dominant) {
          return true;
        }

        const search = _.endsWith(association.nature, 'One') || association.nature === 'oneToMany' ? { [association.via]: data._id } : { [association.via]: { $in: [data._id] } };
        const update = _.endsWith(association.nature, 'One') || association.nature === 'oneToMany' ? { [association.via]: null } : { $pull: { [association.via]: data._id } };

        // Retrieve model.
        const model = association.plugin ?
          strapi.plugins[association.plugin].models[association.model || association.collection] :
          strapi.models[association.model || association.collection];

        return model.update(search, update, { multi: true });
      })
    );

    return data;
  },

  /**
   * Promise to search a/an informativeprofile.
   *
   * @return {Promise}
   */

  search: async (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('informativeprofile', params);
    // Select field to populate.
    const populate = Informativeprofile.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    const $or = Object.keys(Informativeprofile.attributes).reduce((acc, curr) => {
      switch (Informativeprofile.attributes[curr].type) {
        case 'integer':
        case 'float':
        case 'decimal':
          if (!_.isNaN(_.toNumber(params._q))) {
            return acc.concat({ [curr]: params._q });
          }

          return acc;
        case 'string':
        case 'text':
        case 'password':
          return acc.concat({ [curr]: { $regex: params._q, $options: 'i' } });
        case 'boolean':
          if (params._q === 'true' || params._q === 'false') {
            return acc.concat({ [curr]: params._q === 'true' });
          }

          return acc;
        default:
          return acc;
      }
    }, []);

    return Informativeprofile
      .find({ $or })
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(populate);
  }
};
