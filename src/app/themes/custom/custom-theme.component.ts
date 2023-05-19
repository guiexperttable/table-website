import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, OnInit } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { ColorRgb, ColorRgbIf } from "@guiexpert/table";

@Component({
  selector: "app-custom-theme",
  templateUrl: "./custom-theme.component.html",
  styleUrls: ["./custom-theme.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomThemeComponent implements OnInit {

  public theme = "light";
  public light = true;
  public arr = [
    ["99%", 0.05],
    ["96%", 0.05],
    ["93%", 0.05],
    ["90%", 0.1],
    ["86%", 0.2],
    ["83%", 0.2],
    ["80%", 0.2],
    ["75%", 0.2],
    ["70%", 0.25],
    ["65%", 0.31],
    ["60%", 0.27],
    ["55%", 0.27],
    ["50%", 0.27],
    ["45%", 0.25],
    ["40%", 0.25],
    ["35%", 0.25],
    ["30%", 0.2],
    ["25%", 0.2],
    ["20%", 0.2],
    ["15%", 0.2],
    ["10%", 0.2],
    ["5%", 0.1]
  ];
  public hueValues: number[] = [];
  public percentages: number[] = [];

  public selectedColor = "#0098db";

  public swatches = [
    "oklch(99% .05 var(--hue))",
    "oklch(90% .1 var(--hue))",
    "oklch(80% .2 var(--hue))",
    "oklch(72% .25 var(--hue))",
    "oklch(67% .31 var(--hue))",
    "oklch(50% .27 var(--hue))",
    "oklch(35% .25 var(--hue))",
    "oklch(25% .2 var(--hue))",
    "oklch(13% .2 var(--hue))",
    "oklch(5% .1 var(--hue))"
  ].reverse();

  public oklchUrl='';

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly elementRef: ElementRef,
    private readonly cdr: ChangeDetectorRef
  ) {
    for (let i = 0; i < 360; i++) {
      this.hueValues.push(i);
    }
    for (let i = 0; i < 100; i++) {
      this.percentages.push(i);
    }
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
    this.light = m === "light";
    this.cdr.detectChanges();
  }

  setColor(txt: string) {
    this.selectedColor = txt;
    console.info(txt);
    this.oklchUrl = this.calcOklchUrl();
  }

  formatLabel(value: number): string {
    return `Hue:${value}deg`;
  }

  onModelChanged($event: any) {
    console.info($event);
  }

  ngOnInit(): void {
    //
  }

  rgb2hex(red: number, green: number, blue: number): string {
    return "#" + red.toString(16) + green.toString(16) + blue.toString(16);
  }

  hexToRgb(hex: string): ColorRgbIf {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? new ColorRgb(
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)) : new ColorRgb(0, 0, 0);
  }

  getSelectedColor() {
    return this.selectedColor.replace(/var\(--hue\)/g, this.value + "");
  }

  colorPickerChanged($event: Event) {
    if (($event.target as HTMLInputElement).value) {
      this.selectedColor = ($event.target as HTMLInputElement).value;
      this.cdr.detectChanges();
    }
  }

  calcOklchUrl(): string {
    if (this.selectedColor.startsWith("#")) {
      return '';
    }
    const arr = this.getSelectedColor()
      .replace(/[^0123456789 .]/g, '')
      .split(" ")
      .map(s=>parseFloat(s));
    return 'https://oklch.com/#' + arr[0] + ',' + arr[1] + ',' + arr[2] + ',100';
  }

}
