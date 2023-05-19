import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { OkLch } from "../data/ok-lch";

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
    [100, 0.2],
    [95, 0.2],
    [90, 0.2],
    [85, 0.2],
    [80, 0.2],
    [75, 0.2],
    [70, 0.25],
    [65, 0.31],
    [60, 0.27],
    [55, 0.27],
    [50, 0.27],
    [45, 0.25],
    [40, 0.25],
    [35, 0.25],
    [30, 0.2],
    [25, 0.2],
    [20, 0.2],
    [15, 0.2],
    [10, 0.2],
    [5, 0.2]
  ];
  public hueValues: number[] = [];
  public percentages: number[] = [];
  public chromas: number[] = [];

  public okLch = new OkLch(50, .27, 266, 100);
  public url = "";
  public cssString = "";


  constructor(
    private readonly cdr: ChangeDetectorRef
  ) {
    for (let i = 0; i < 100; i++) {
      this.hueValues.push(i * 3.6);
    }
    for (let i = 0; i < 100; i++) {
      this.percentages.push(i);
    }
    for (let i = 0; i < 100; i++) {
      this.chromas.push(0.333 / 100 * i);
    }
  }

  setTheme(m: "light" | "dark") {
    this.theme = m;
    this.light = m === "light";
    this.cdr.detectChanges();
  }

  setOkLch(l: number, c: number, h: number, a: number = 100) {
    this.okLch = new OkLch(l, c, h, a);
    this.calc();
  }

  formatLabelHue(value: number): string {
    return `Hue:${value}deg`;
  }

  formatLabelAlpha(value: number): string {
    return `a:${value}`;
  }

  formatLabelChroma(value: number): string {
    return `c:${value}`;
  }

  formatLabelLightness(value: number): string {
    return `l:${value}`;
  }

  onModelChanged($event: any) {
    console.info($event);
  }

  ngOnInit(): void {
    this.calc();
  }

  onSliderChangedHue(h: number) {
    this.okLch.h = h;
    this.calc();
  }

  onSliderChangedAlpha(a: number) {
    this.okLch.a = a;
    this.calc();
  }

  onSliderChangedChroma(c: number) {
    this.okLch.c = c;
    this.calc();
  }

  onSliderChangedLightness(l: number) {
    this.okLch.l = l;
    this.calc();
  }

  calc() {
    this.url = "https://oklch.com/#" + this.okLch.l + "," + this.okLch.c + "," + this.okLch.h + "," + this.okLch.a;
    this.cssString = this.okLch.toCssString();
    this.cdr.detectChanges();
  }
}
