import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnDestroy, OnInit } from "@angular/core";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: "app-doc-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeComponent implements OnInit, OnDestroy {

  public freezeUi = true;
  private observer?: IntersectionObserver;

  constructor(
    private readonly elementRef: ElementRef,
    @Inject(DOCUMENT) private readonly document: Document
  ) {
    // let nativeElement = this.elementRef.nativeElement;
    // nativeElement.addEventListener("scroll", () => {
    //   const mh = nativeElement.scrollTop / (nativeElement.scrollHeight - nativeElement.offsetHeight);
    //   const ph = (nativeElement.scrollTop & nativeElement.offsetHeight) / nativeElement.offsetHeight;
    //   nativeElement.style.setProperty("--scroll-mh", mh + "");
    //   nativeElement.style.setProperty("--scroll-ph", ph + "");
    // }, false);
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

  ngOnInit(): void {
    this.observer = new IntersectionObserver(entries =>
      entries
        .forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add("show");
            } else {
              entry.target.classList.remove("show");
            }
          }
        ));

    this.document
      .querySelectorAll("section")
      .forEach(el => this.observer?.observe(el));

  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
