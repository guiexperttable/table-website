import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef } from "@angular/core";

@Component({
  selector: "app-custom-theme",
  templateUrl: "./custom-theme.component.html",
  styleUrls: ["./custom-theme.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomThemeComponent {

  public theme = "light";
  public light = true;

  constructor(
    // @Inject(DOCUMENT) private readonly document: Document,
    private readonly elementRef: ElementRef,
    private readonly cdr: ChangeDetectorRef
  ) {
  }

  private _value = 320;

  get value(): number {
    return this._value;
  }

  set value(value: number) {
    this._value = value;
    this.elementRef.nativeElement.style.setProperty("--hue", "" + value);
  }

  setTheme(m: "light" | "dark") {
    this.theme = m;
    this.light = m==='light';
    this.cdr.detectChanges();
  }

  formatLabel(value: number): string {
    return `${value}%`;
  }

  onModelChanged($event: any) {
    console.info($event);
  }
}
