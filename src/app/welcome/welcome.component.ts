import { ChangeDetectionStrategy, Component, ElementRef } from "@angular/core";

@Component({
  selector: "app-doc-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeComponent {

  freezeUi = true;

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
