### Dynamic Properties Provider JS
[![Build](https://github.com/kiwiproject/dynamic-properties-provider-js/workflows/build/badge.svg)](https://github.com/kiwiproject/dynamic-properties-provider-js/actions?query=workflow%3Abuild)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=kiwiproject_dynamic-properties-provider-js-js&metric=alert_status)](https://sonarcloud.io/dashboard?id=kiwiproject_dynamic-properties-provider-js)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=kiwiproject_dynamic-properties-provider-js&metric=coverage)](https://sonarcloud.io/dashboard?id=kiwiproject_dynamic-properties-provider-js)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![NPM](https://img.shields.io/npm/v/@kiwiproject/dynamic-properties-provider)](https://www.npmjs.com/package/@kiwiproject/dynamic-properties-provider)


Dynamic Properties Provider is a utility library to assist in the generation of field definitions based on model classes. This process is helpful if a UI needs to build dynamic forms based on models in a service but don't want to hardcode all the fields of the models in the UI. This is a port of the Java library with the same name. (https://github.com/kiwiproject/dynamic-properties-provider).

### Usage
To install run:

```shell
npm i @kiwiproject/dynamic-property-provider
```

For each object or model that is to have dynamically provided properties add the `getDynamicProperties` method to return the list of properties. For example:

```js
class Student {
  constructor(id, firstName, lastName, age, birthDate) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.birthDate = birthDate;
  }

  static getDynamicProperties() {
    const idProp = Property.newProperty()
      .setName("id")
      .setType("number")
      .setLabel("Student ID");

    const firstNameProp = Property.newProperty()
      .setName("firstName")
      .setType("string")
      .setLabel("First Name");

    const lastNameProp = Property.newProperty()
      .setName("lastName")
      .setType("string")
      .setLabel("Last Name");

    const ageProp = Property.newProperty()
      .setName("age")
      .setType("number")
      .setLabel("Current Age");

    const birthDateProp = Property.newProperty()
      .setName("birthDate")
      .setType("date")
      .setLabel("Birthday");
    
    return [
      idProp, firstNameProp, lastNameProp, ageProp, birthDateProp
    ];
  }
}
```

__Please note that this can be basic object and does not need to be a class__

The following options are available to set for each property:

* name - This should match the field name being defined
* type - The data type of the field. Valid values are [string, number, date, boolean, array]
* label - A human-readable label for the field
* required - Whether this field should be considered a required field
* visible - Indicator if the field should be made visible on the UI form
* editable - Indicator if the field should be editable on the UI form
* sensitive - Indicator if the field value should be masked on the UI form
* units - A list of units available to tie to the field, for instance cm, m, km
* defaultUnit - If units are provided, which one should be the default
* values - A list of possible values to choose from for the field

### Express endpoint integration
To include endpoints to retrieve the dynamic properties the following code can be added:

```js
import { PropertyExtractor } from "@kiwiproject/dynamic-properties-provider";

const propertyRouter = PropertyExtractor.setupDynamicPropertiesEndpoints({
  student: Student,
  // Add any other objects defining getDynamicProperties
});

const app = express();
app.use(propertyRouter);
```

Once integrated, the following endpoints become available:

* `GET /kiwi/dynamic-properties` - Returns a mapping of all objects setup with their properties
* `GET /kiwi/dynamic-properties/:identifier` - Returns the list of properties for a given object (e.g. `student`)
