export class Property {
  constructor(
    public name: string,
    public propType: string,
    public array: boolean = false,
    public nullable: boolean = false,
    public undefinedable: boolean = false
  ) {
  }

  toString(): string{
    const arr = this.array ? "[]" : "";
    const nul = this.nullable ? "|null" : "";
    const und = this.undefinedable ? "|undefined" : "";
    return `${this.name}: ${this.propType}${arr}${nul}${und}`;
  }
}
