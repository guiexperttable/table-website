import { ChangeDetectionStrategy, Component, ElementRef } from "@angular/core";

@Component({
  selector: "app-pricing",
  templateUrl: "./pricing.component.html",
  styleUrls: ["./pricing.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PricingComponent {

  constructor(
    private readonly elementRef: ElementRef
  ) {
  }

  scrollDown() {
    const h = document.body.offsetHeight;
    this.elementRef.nativeElement.scrollBy({
      top: h,
      left: 0,
      behavior: "smooth"
    });
  }

}
