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
    let nativeElement = this.elementRef.nativeElement;
    nativeElement.addEventListener("scroll", () => {
      const mh = nativeElement.scrollTop / (nativeElement.scrollHeight - nativeElement.offsetHeight);
      const ph = (nativeElement.scrollTop & nativeElement.offsetHeight) / nativeElement.offsetHeight;
      nativeElement.style.setProperty("--scroll-mh", mh + "");
      nativeElement.style.setProperty("--scroll-ph", ph + "");
    }, false);
  }

  scrollDown() {
    const h = document.body.offsetHeight;
    this.elementRef.nativeElement.scrollBy({
      top: h,
      left: 0,
      behavior: "smooth"
    });

  }

  openCustomThemePicker() {
    window.open(
      "http://localhost:4200/themes/custom/picker#welcome",
      "_blank",
      "left=100,top=100,width=720,height=755,location=0,scrollbars=0,status=0");
  }
}
