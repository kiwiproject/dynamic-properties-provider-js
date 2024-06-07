export class Property {
  name: string;
  label: string;
  type: string;

  required: boolean;
  visible: boolean;
  editable: boolean;
  sensitive: boolean;

  units: Array<string>;
  defaultUnit: string;

  values: Array<any> = [];

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

  setEditable(editable: boolean): this {
    this.editable = editable;
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

  setValues(values: Array<any>): this {
    this.values = values;
    return this;
  }
}
