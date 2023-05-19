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
}
