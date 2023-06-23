import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { GenerateClassesService } from "./generate-classes.service";

@Component({
  selector: "app-generator",
  templateUrl: "./generator.component.html",
  styleUrls: ["./generator.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeneratorComponent implements OnInit {

  out = "";

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ["", Validators.required]
  });

  private oo = {
    name: "John Doe",
    age: 30,
    email: "johndoe@example.com",
    address: {
      street: "123 Main St",
      city: "New York",
      country: "USA"
    }
  };

  constructor(
    private readonly generateClassesService: GenerateClassesService,
    private readonly cdr: ChangeDetectorRef,
    private readonly _formBuilder: FormBuilder
  ) {

  }

  private _text = JSON.stringify(this.oo, null, 4);

  get text(): string {
    return this._text;
  }

  set text(value: string) {
    this._text = value;
    this.generateInterfaces();
  }

  ngOnInit(): void {
    this.generateInterfaces();
  }

  private generateInterfaces() {
    // Reset source-code component:
    this.out = "";
    this.cdr.detectChanges();

    try {
      const o = JSON.parse(this._text);
      const typeScriptInterfaces = this.generateClassesService.generateTypeScriptInterfaces(o);
      this.out = this.generateClassesService.generateTypeScriptCode(typeScriptInterfaces);
      console.info(this.out); // TODO weg
      this.cdr.detectChanges();

    } catch (e) {
      console.warn(e);
      this.out = "";
      this.cdr.detectChanges();
    }
  }
}
