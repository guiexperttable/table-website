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
    const nativeElement = this.elementRef.nativeElement;
    nativeElement.addEventListener("scroll", () => {
      const offsetHeight = nativeElement.offsetHeight + 16;
      const rotH = 0.5 + ((nativeElement.scrollTop + offsetHeight / 2) % offsetHeight) / offsetHeight;
      const rotateY = `${rotH * 180 - 180}deg`;
      nativeElement.style.setProperty("--rotateY", rotateY);


      let opacH = (((nativeElement.scrollTop + offsetHeight) % offsetHeight) / offsetHeight) % 1;
      if (opacH < 0.5) {
        opacH = 1 - opacH;
      }
      if (opacH === 0) opacH = 1;
      opacH = (opacH - 1) * 2 + 1;
      const opacity = `${opacH}`;
      nativeElement.style.setProperty("--opacity", opacity);
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
