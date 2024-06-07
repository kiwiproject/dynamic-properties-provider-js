import express from "express";
import { Property } from "./property";

/**
 * Attempts to pull the list of dynamic properties for a given object.
 *
 * @param obj The object that has a getDynamicProperties method
 * @throws error if given object does not have a getDynamicProperties method
 */
function getPropertyListForObject(obj: any): Array<Property> {
  if (!obj.getDynamicProperties) {
    throw new Error(
      'The given object does not have a "getDynamicProperties" method. Can not process property list.',
    );
  }

  return obj.getDynamicProperties();
}

/**
 * Sets up endpoints to add to an express server to return dynamic properties
 * @param objects The map of identifiers to an object. This object will ultimately be passed to #getPropertyListForObject
 */
function setupDynamicPropertiesEndpoints(
  objects: Record<string, any>,
): express.Router {
  const router = express.Router();

  router.get("/kiwi/dynamic-properties", (_req, res) => {
    const props: object = {};
    for (const key of Object.keys(objects)) {
      props[key] = getPropertyListForObject(objects[key]);
    }

    res.json(props);
  });

  router.get("/kiwi/dynamic-properties/:identifier", (req, res) => {
    const objectProps = getPropertyListForObject(
      objects[req.params.identifier],
    );
    res.json(objectProps);
  });

  return router;
}

export const PropertyExtractor = {
  getPropertyListForObject,
  setupDynamicPropertiesEndpoints,
};
