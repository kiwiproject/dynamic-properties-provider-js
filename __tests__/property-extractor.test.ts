import {describe, expect, it} from "@jest/globals";
import request from "supertest";

import { PropertyExtractor } from "../src";
import {Property} from "../src/property";
import express from "express";

describe("Property Extractor", () => {
  describe("getPropertyListForObject", () => {
    it("should throw an error if object is not set up correctly", () => {
      const badObj = {
        foo: "boom"
      };

      expect(() => {
        PropertyExtractor.getPropertyListForObject(badObj);
      }).toThrowError(new Error('The given object does not have a "getDynamicProperties" method. Can not process property list.'));
    });

    it("should return the properties for the obj", () => {
      const prop = Property.newProperty().setName("foo").setType("string");

      const goodObj = {
        foo: "Yeah",

        getDynamicProperties: () => {
          return [
            prop
          ]
        }
      };

      const propList = PropertyExtractor.getPropertyListForObject(goodObj);

      expect(propList).toEqual([prop]);
    });
  });

  describe("setupDynamicPropertiesEndpoints", () => {
    function setupApp(router: express.Router) {
      const app = express();
      app.use(express.json());
      app.use(router);

      return app;
    }

    describe("getAllProperties", () => {
      it("should return the dynamic properties for all configured objects", async () => {
        const studentProp = Property.newProperty().setName("foo").setType("string");
        const teacherProp = Property.newProperty().setName("bar").setType("string");

        const studentObject = {
          foo: "Yeah",

          getDynamicProperties: () => {
            return [
              studentProp
            ]
          }
        };

        const teacherObject = {
          foo: "Yeah",

          getDynamicProperties: () => {
            return [
              teacherProp
            ]
          }
        };

        const router = PropertyExtractor.setupDynamicPropertiesEndpoints({ student: studentObject, teacher: teacherObject });
        const app = setupApp(router);

        return request(app)
          .get("/kiwi/dynamic-properties")
          .expect(200)
          .then((res) => {
            expect(res.body).toEqual({student: [studentProp], teacher: [teacherProp]});
          });

      });

      it("should return the dynamic properties for the given configured object", async () => {
        const studentProp = Property.newProperty().setName("foo").setType("string");
        const teacherProp = Property.newProperty().setName("bar").setType("string");

        const studentObject = {
          foo: "Yeah",

          getDynamicProperties: () => {
            return [
              studentProp
            ]
          }
        };

        const teacherObject = {
          foo: "Yeah",

          getDynamicProperties: () => {
            return [
              teacherProp
            ]
          }
        };

        const router = PropertyExtractor.setupDynamicPropertiesEndpoints({ student: studentObject, teacher: teacherObject });
        const app = setupApp(router);

        return request(app)
          .get("/kiwi/dynamic-properties/student")
          .expect(200)
          .then((res) => {
            expect(res.body).toEqual([studentProp]);
          });

      });
    });
  });
});
