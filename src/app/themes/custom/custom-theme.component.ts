import { ChangeDetectionStrategy, Component, ElementRef } from "@angular/core";

@Component({
  selector: "app-custom-theme",
  templateUrl: "./custom-theme.component.html",
  styleUrls: ["./custom-theme.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomThemeComponent {

  constructor(
    private readonly elementRef: ElementRef
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

  formatLabel(value: number): string {
    return `${value}%`;
  }

  onModelChanged($event: any) {
    console.info($event);
  }
}
