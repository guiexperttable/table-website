import { Property } from "./property";

export class TypeScriptInterface {
  constructor(
    public name: string,
    public properties: Property[]
  ) {
  }
}
