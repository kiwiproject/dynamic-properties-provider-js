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

  setName(name: string): Property {
    this.name = name;
    return this;
  }

  setLabel(label: string): Property {
    this.label = label;
    return this;
  }

  setType(type: string): Property {
    this.type = type;
    return this;
  }

  setRequired(required: boolean): Property {
    this.required = required;
    return this;
  }

  setVisible(visible: boolean): Property {
    this.visible = visible;
    return this;
  }

  setEditable(editable: boolean): Property {
    this.editable = editable;
    return this;
  }

  setSensitive(sensitive: boolean): Property {
    this.sensitive = sensitive;
    return this;
  }

  setUnits(units: Array<string>): Property {
    this.units = units;
    return this;
  }

  setDefaultUnit(defaultUnit: string): Property {
    this.defaultUnit = defaultUnit;
    return this;
  }

  setValues(values: Array<any>): Property {
    this.values = values;
    return this;
  }
}
