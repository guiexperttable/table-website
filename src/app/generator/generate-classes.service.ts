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



  generateTypeScriptInterfaces(
    json: JSONData,
    interfaceName: string = 'MyInterface'
  ): TypeScriptInterface[] {
    const interfaces: TypeScriptInterface[] = [];

    const processProperty = (propertyName: string, propertyValue: any): string => {
      if (Array.isArray(propertyValue)) {
        const arrayType = processProperty(propertyName, propertyValue[0]);
        return `${propertyName}: ${arrayType}[];`;
      }

      if (typeof propertyValue === 'object' && propertyValue !== null) {
        const nestedInterfaceName = `${interfaceName}_${propertyName}`;
        const nestedInterface = this.generateTypeScriptInterfaces(propertyValue, nestedInterfaceName);
        interfaces.push(...nestedInterface);
        return `${propertyName}: ${nestedInterfaceName};`;
      }

      const propertyType = typeof propertyValue;
      return `${propertyName}: ${propertyType};`;
    };

    const interfaceProperties = Object.entries(json).map(([key, value]) => processProperty(key, value));

    interfaces.push({
      name: interfaceName,
      properties: interfaceProperties,
    });

    return interfaces;
  }

  generateTypeScriptCode(interfaces: TypeScriptInterface[]): string {
    let tsCode = '';

    for (const { name, properties } of interfaces) {
      tsCode += `interface ${name} {\n`;
      tsCode += properties.map((property) => `  ${property}`).join('\n');
      tsCode += '\n}\n\n';
    }

    return tsCode;
  }


}
