import {describe, expect, it} from "@jest/globals";
import {Property} from "../src/property";

describe("Property", () => {
  it("should allow setup from builder", () => {
    const prop = Property.newProperty().setName("name").setType("string").setLabel("Property Name").setVisible(true).setEditable(true).setSensitive(false).setRequired(false).setUnits(["m", "km"]).setDefaultUnit("km").setValues(["blah"]);

    expect(prop.name).toEqual("name");
    expect(prop.type).toEqual("string");
    expect(prop.label).toEqual("Property Name");
    expect(prop.visible).toEqual(true);
    expect(prop.editable).toEqual(true);
    expect(prop.sensitive).toEqual(false);
    expect(prop.required).toEqual(false);
    expect(prop.units).toEqual(["m", "km"]);
    expect(prop.defaultUnit).toEqual("km");
    expect(prop.values).toEqual(["blah"]);
  });
});
