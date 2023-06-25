import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, ValidationErrors } from "@angular/forms";
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

  error = "";
  out = "";

  firstFormGroup = this.formBuilder.group({
    firstCtrl: [
      "",
      (_control: AbstractControl): ValidationErrors | null => {
        if (this.error) {
          return {
            jsonError: this.error
          };
        }
        return null;
      }
    ]
  });

  private input$ = new Subject<number>();

  private oo = [
    {
      name: "John Doe",
      age: 30,
      email: "johndoe@example.com",
      address: {
        street: "123 Main St",
        city: "New York",
        country: "USA"
      },
      books: [
        {
          title: "titel 1",
          isbn: 23456
        },
        {
          title: "titel 2",
          isbn: 1234
        },
        {
          title: "titel 5",
          isbn: 8765
        }
      ]
    },
    {
      name: "John Doe2",
      age: 32,
      email: "johndoe@example.com",
      address: {
        street: "123 Main St",
        city: "New York",
        country: "USA"
      },
      books: [
        {
          title: "titel 1",
          isbn: 23456
        },
        {
          title: "titel 2",
          isbn: 1234
        },
        {
          title: "titel 5",
          isbn: 8765
        }
      ]
    }
  ];
  private alive = true;

  constructor(
    private readonly generateClassesService: GenerateClassesService,
    private readonly cdr: ChangeDetectorRef,
    private readonly formBuilder: FormBuilder
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
    this.error = "";
    // Reset source-code component:
    this.out = "";
    this.cdr.detectChanges();

    try {
      this.out = this.generateClassesService.json2Ts(this._text);

    } catch (e) {
      this.error = `${e}`;
      this.out = "";
      console.error(e); // TODO del

    } finally {
      this.cdr.detectChanges();
    }
  }
}
