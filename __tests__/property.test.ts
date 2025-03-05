import { describe, expect, it } from "@jest/globals";
import { Property } from "../src/property";

describe("Property", () => {
  it("should allow setup from builder", () => {
    const prop = Property.newProperty()
      .setName("name")
      .setType("string")
      .setLabel("Property Name")
      .setVisible(true)
      .setEditableOnCreate(true)
      .setEditableOnUpdate(true)
      .setSensitive(false)
      .setRequired(false)
      .setUnits(["m", "km"])
      .setDefaultUnit("km")
      .setValues([{ value: 1, display: "blah" }]);

    expect(prop.name).toEqual("name");
    expect(prop.type).toEqual("string");
    expect(prop.label).toEqual("Property Name");
    expect(prop.visible).toEqual(true);
    expect(prop.editableOnCreate).toEqual(true);
    expect(prop.editableOnUpdate).toEqual(true);
    expect(prop.sensitive).toEqual(false);
    expect(prop.required).toEqual(false);
    expect(prop.units).toEqual(["m", "km"]);
    expect(prop.defaultUnit).toEqual("km");
    expect(prop.values).toEqual([{ value: 1, display: "blah" }]);
  });
});
