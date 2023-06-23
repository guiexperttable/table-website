//import { writeFileSync } from 'fs';

interface JSONData {
  [key: string]: any;
}

interface TypeScriptInterface {
  name: string;
  properties: string[];
}

function generateTypeScriptInterfaces(json: JSONData, interfaceName: string): TypeScriptInterface[] {
  const interfaces: TypeScriptInterface[] = [];

  const processProperty = (propertyName: string, propertyValue: any): string => {
    if (Array.isArray(propertyValue)) {
      const arrayType = processProperty(propertyName, propertyValue[0]);
      return `${propertyName}: ${arrayType}[];`;
    }

    if (typeof propertyValue === 'object' && propertyValue !== null) {
      const nestedInterfaceName = `${interfaceName}_${propertyName}`;
      const nestedInterface = generateTypeScriptInterfaces(propertyValue, nestedInterfaceName);
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

function generateTypeScriptCode(interfaces: TypeScriptInterface[]): string {
  let tsCode = '';

  for (const { name, properties } of interfaces) {
    tsCode += `interface ${name} {\n`;
    tsCode += properties.map((property) => `  ${property}`).join('\n');
    tsCode += '\n}\n\n';
  }

  return tsCode;
}

// Sample JSON data
const jsonData: JSONData = {
  name: 'John Doe',
  age: 30,
  email: 'johndoe@example.com',
  address: {
    street: '123 Main St',
    city: 'New York',
    country: 'USA',
  },
};


