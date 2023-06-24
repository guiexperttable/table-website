import { Injectable } from "@angular/core";
import { JSONData } from "./data/json.data";
import { TypeScriptInterface } from "./data/type-script.interface";

/**
 * // Generate TypeScript interfaces
 * const interfaces = generateTypeScriptInterfaces(jsonData, 'MyInterface');
 *
 * // Generate TypeScript code
 * const tsCode = generateTypeScriptCode(interfaces);
 *
 * // Output:
 * console.info(tsCode);
 */
@Injectable({
  providedIn: "root"
})
export class GenerateClassesService {

  json2Ts(json: string): string {
    const o = JSON.parse(json);
    const typeScriptInterfaces = this.generateTypeScriptInterfaces(o);
    return this.generateTypeScriptCode(typeScriptInterfaces);
  }

  private generateTypeScriptInterfaces(
    json: JSONData,
    interfaceName: string = "RootIf"
  ): TypeScriptInterface[] {
    const interfaces: TypeScriptInterface[] = [];


    if (Array.isArray(json)) {
      interfaces.push({
        name: interfaceName,
        properties: ['items: ' + interfaceName+'Item[];']
      });
      const interfaceProperties = Object.entries(json[0]).map(([key, value]) => this.processProperty(key, value, interfaces));
      interfaces.push({
        name: interfaceName+'Item',
        properties: interfaceProperties
      });
      return interfaces;
    }
    const interfaceProperties = Object.entries(json).map(([key, value]) => this.processProperty(key, value, interfaces));
    interfaces.push({
      name: interfaceName,
      properties: interfaceProperties
    });
    return interfaces;
  }

  private generateTypeScriptCode(interfaces: TypeScriptInterface[]): string {
    let tsCode: string[] = [];

    for (const { name, properties } of interfaces) {
      tsCode.push(`interface ${name} {\n`);
      tsCode.push(properties.map((property) => `  ${property}`).join("\n"));
      tsCode.push("\n}\n\n");
    }

    return tsCode.join("");
  }

  private processProperty(
    propertyName: string,
    propertyValue: any,
    interfaces: TypeScriptInterface[]): string {

    if (Array.isArray(propertyValue)) {
      const arrayType = this.processProperty(propertyName, propertyValue[0], interfaces).split(' ')[1].replace(/;/g, '');
      return `${propertyName}: ${arrayType}[];`;
    }

    if (typeof propertyValue === "object" && propertyValue !== null) {
      // const nestedInterfaceName = `${interfaceName}_${propertyName}`;
      const nestedInterfaceName = this.capitalizeFirstLetter(`${propertyName}If`);
      const nestedInterface = this.generateTypeScriptInterfaces(propertyValue, nestedInterfaceName);
      interfaces.push(...nestedInterface);
      return `${propertyName}: ${nestedInterfaceName};`;
    }

    const propertyType = typeof propertyValue;
    return `${propertyName}: ${propertyType};`;
  };

  private capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

}
