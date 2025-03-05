import { Router } from "express";
import { Property } from "./property";

export interface ObjectWithDynamicProperties {
  getDynamicProperties(): Promise<Array<Property>>;
}

/**
 * Attempts to pull the list of dynamic properties for a given object.
 *
 * @param obj The object that has a getDynamicProperties method
 */
async function getPropertyListForObject(
  obj: ObjectWithDynamicProperties,
): Promise<Array<Property>> {
  return await obj.getDynamicProperties();
}

/**
 * Sets up endpoints to add to an express server to return dynamic properties
 * @param objects The map of identifiers to an object. This object will ultimately be passed to #getPropertyListForObject
 */
function setupDynamicPropertiesEndpoints(
  objects: Record<string, ObjectWithDynamicProperties>,
): Router {
  const router = Router();

  router.get("/kiwi/dynamic-properties", async (_req, res, next) => {
    const props: object = {};
    for (const key of Object.keys(objects)) {
      props[key] = await getPropertyListForObject(objects[key]).catch(next);
    }

    res.json(props);
  });

  router.get("/kiwi/dynamic-properties/:identifier", async (req, res, next) => {
    const objectProps = await getPropertyListForObject(
      objects[req.params.identifier],
    ).catch(next);
    res.json(objectProps);
  });

  return router;
}

export const PropertyExtractor = {
  getPropertyListForObject,
  setupDynamicPropertiesEndpoints,
};
