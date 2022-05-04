import isArray from "lodash/isArray";
import isEmpty from "lodash/isEmpty";
import isObject from "lodash/isObject";
import forOwn from "lodash/forOwn";
import map from "lodash/map";
import mapValues from "lodash/mapValues";
import forEach from "lodash/forEach";
import merge from "lodash/merge";
import get from "lodash/get";
import { ObjectId } from "mongodb";

/**
 *
 * Create the filter object for Postgres from the GraphQL filter definitions.
 *
 * @param filter
 * @param mapFields
 * @returns {{}} object to be passed to `the prisma.db.findMany` selector
 *
 * eq: equals -> to match equals values
 * gt: gt -> to match values greater then
 * gte: gte -> to match values greater then or equals
 * lt: lt -> to match values lesser then
 * lte: lte -> to match values lesser then or equals
 * ctn: contains -> to match values contains the passed value
 *
 */

export const createFilter = (filter: object, mapFields = {}) => {
  const transformInput = (inputName: any, inputValue: any) => {
    const parseValue = (value: any, field: any) => {
      if (field === "_id") return new ObjectId(value);
      return value;
    };

    const transformValue = (inputValueTmp: any, field: any) => {
      const newObject: any = {};

      forOwn(inputValueTmp, (value: any, key: any) => {
        if (isArray(value)) {
          value = map(value, (item: any) => parseValue(item, field));
        } else {
          value = parseValue(value, field);
        }
        switch (key) {
          case "eq":
            newObject.$eq = value;
            break;
          case "gt":
            newObject.$gt = value;
            break;
          case "lt":
            newObject.$lt = value;
            break;
          case "gte":
            newObject.$gte = value;
            break;
          case "lte":
            newObject.$lte = value;
            break;
          case "ctn":
            newObject.$regex = new RegExp(value, "i");
            break;
          default:
            return key;
        }
      });

      return newObject;
    };

    if (isObject(inputValue) && !isArray(inputValue)) {
      let localField = get(
        mapFields,
        get(inputValue, "field"),
        get(inputValue, "field")
      );
      const newObject: any = {
        [localField]: transformValue(get(inputValue, "condition"), localField),
      };

      return newObject;
    }

    return inputValue;
  };

  if (!filter || !isObject(filter)) {
    return {};
  }

  const { OR = [], AND = [], NOT, negate = false, ...rest }: any = filter;
  let builtFilter: any = {};

  forOwn(rest, (obj, key) => {
    const value = transformInput(key, obj);

    if (!value || value === null || !isObject(value)) {
      return;
    }
    if (!negate) {
      builtFilter = merge(builtFilter, value);
    } else {
      builtFilter = merge(
        builtFilter,
        mapValues(value, (val) => ({
          $not: val,
        }))
      );
    }
  });

  if (NOT) {
    builtFilter = merge(
      builtFilter,
      createFilter(
        merge(NOT, {
          negate: true,
        }),
        mapFields
      )
    );
  }

  if (!isEmpty(OR)) {
    const ors: any = [];
    forEach(OR, (or) => ors.push(createFilter(or, mapFields)));

    if (!isEmpty(ors)) {
      builtFilter.$or = ors;
    }
  }

  if (!isEmpty(AND)) {
    const ands: any = [];
    forEach(AND, (and) => ands.push(createFilter(and, mapFields)));

    if (!isEmpty(ands)) {
      builtFilter.$and = ands;
    }
  }

  return !isEmpty(builtFilter) ? builtFilter : {};
};
