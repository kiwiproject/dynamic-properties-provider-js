export class Property {
  name: string;
  label: string;
  type: string;

  required: boolean;
  visible: boolean;
  editableOnCreate: boolean;
  editableOnUpdate: boolean;
  sensitive: boolean;

  units: Array<string>;
  defaultUnit: string;

  values: Array<{ value: string | number; display: string | number }> = [];

  static newProperty() {
    return new Property();
  }

  setName(name: string): this {
    this.name = name;
    return this;
  }

  setLabel(label: string): this {
    this.label = label;
    return this;
  }

  setType(type: string): this {
    this.type = type;
    return this;
  }

  setRequired(required: boolean): this {
    this.required = required;
    return this;
  }

  setVisible(visible: boolean): this {
    this.visible = visible;
    return this;
  }

  setEditableOnCreate(editableOnCreate: boolean): this {
    this.editableOnCreate = editableOnCreate;
    return this;
  }

  setEditableOnUpdate(editableOnUpdate: boolean): this {
    this.editableOnUpdate = editableOnUpdate;
    return this;
  }

  setSensitive(sensitive: boolean): this {
    this.sensitive = sensitive;
    return this;
  }

  setUnits(units: Array<string>): this {
    this.units = units;
    return this;
  }

  setDefaultUnit(defaultUnit: string): this {
    this.defaultUnit = defaultUnit;
    return this;
  }

  setValues(
    values: Array<{ value: string | number; display: string | number }>,
  ): this {
    this.values = values;
    return this;
  }
}
