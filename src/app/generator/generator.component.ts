import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { GenerateClassesService } from "./generate-classes.service";
import { debounceTime, Subject } from "rxjs";
import { takeWhile } from "rxjs/operators";

@Component({
  selector: "app-generator",
  templateUrl: "./generator.component.html",
  styleUrls: ["./generator.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeneratorComponent implements OnInit, OnDestroy {

  out = "";
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ["", Validators.required]
  });

  private input$ = new Subject<number>();

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
  private alive = true;

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
    this.input$.next(Date.now());
  }

  ngOnInit(): void {
    this.input$
      .pipe(
        takeWhile(() => this.alive),
        debounceTime(1000)
      )
      .subscribe(this.generateInterfaces.bind(this));
    this.input$.next(Date.now());
  }

  ngOnDestroy(): void {
    this.alive = false;
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
