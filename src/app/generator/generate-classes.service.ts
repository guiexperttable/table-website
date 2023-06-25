import { Injectable } from "@angular/core";
import { JSONData } from "./data/json.data";
import { TypeScriptInterface } from "./data/type-script.interface";
import { Property } from "./data/property";


@Injectable({
  providedIn: "root"
})
export class GenerateClassesService {

  json2Ts(json: string): string {
    const o = JSON.parse(json);
    const typeScriptInterfaces = this.generateTypeScriptInterfaces(o);
    console.info(typeScriptInterfaces);
    return this.generateTypeScriptCode(typeScriptInterfaces);
  }

  private generateTypeScriptInterfaces(
    json: JSONData,
    interfaceName: string = "RootIf"
  ): TypeScriptInterface[] {
    const interfaces: TypeScriptInterface[] = [];

    if (Array.isArray(json)) {
      const arrayPropType = interfaceName + "Item";
      interfaces.push(new TypeScriptInterface(
          interfaceName,
          [new Property("items", arrayPropType, true)]
        )
      );
      const typeScriptInterface = new TypeScriptInterface(
        arrayPropType,
        Object.entries(json[0]).map(([key, value]) => this.processProperty(key, value, interfaces))
      );
      // typeScriptInterface.properties.forEach(prop => this.checkFlags(prop, json));
      interfaces.push(
        typeScriptInterface
      );

      return interfaces;
    }

    interfaces.push(
      new TypeScriptInterface(
        interfaceName,
        Object.entries(json).map(([key, value]) => this.processProperty(key, value, interfaces))
      )
    );
    return interfaces;
  }


  private processProperty(
    propertyName: string,
    propertyValue: any,
    interfaces: TypeScriptInterface[],
    array: boolean = false): Property {

    if (Array.isArray(propertyValue)) {
      const property = this.processProperty(propertyName, propertyValue[0], interfaces, true);
      // this.checkFlags(property, propertyValue);
      return property;
    }

    if (typeof propertyValue === "object" && propertyValue !== null) {
      const nestedInterfaceName = this.capitalizeFirstLetter(`${propertyName}If`);
      const nestedInterface = this.generateTypeScriptInterfaces(propertyValue, nestedInterfaceName);
      interfaces.push(...nestedInterface);
      return new Property(propertyName, nestedInterfaceName, array);
    }

    const propertyType = typeof propertyValue;
    return new Property(propertyName, propertyType, array);
  };

  // private checkFlags(property: Property, arr: any[]) {
  //   console.info(property, arr)
  //   for (let i = 0; i < arr.length; i++) {
  //     const arrElement = arr[i];
  //     if (arrElement[property.name] === undefined) {
  //       property.undefinedable = true;
  //     }
  //     if (arrElement[property.name] === null) {
  //       property.nullable = true;
  //     }
  //     if (property.undefinedable && property.nullable) return;
  //   }
  // }


  private generateTypeScriptCode(interfaces: TypeScriptInterface[]): string {
    const tsCode: string[] = [];
    for (const { name, properties } of interfaces) {
      tsCode.push(`interface ${name} {\n`);
      tsCode.push(properties.map((property) => `  ${property};`).join("\n"));
      tsCode.push("\n}\n\n");
    }
    return tsCode.join("");
  }

  private capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }


}
