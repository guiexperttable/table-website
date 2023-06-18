import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnDestroy, OnInit } from "@angular/core";
import { DOCUMENT } from "@angular/common";


@Component({
  selector: "app-doc-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: [
    "./welcome.component.scss",
    "./feature-box.scss"
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeComponent implements OnInit, OnDestroy {


  public typewriter = true;

  private observer?: IntersectionObserver;
  private nativeElement: HTMLDivElement;

  constructor(
    private readonly elementRef: ElementRef,
    @Inject(DOCUMENT) private readonly document: Document
  ) {
    this.nativeElement = this.elementRef.nativeElement;
    this.nativeElement.addEventListener("scroll", this.onScroll.bind(this), false);
  }

  scrollDown() {
    const h = document.body.offsetHeight;
    this.nativeElement.scrollBy({
      top: h,
      left: 0,
      behavior: "smooth"
    });
  }

  scroll2Top() {
    this.nativeElement.scrollBy({
      top: -99999,
      left: 0,
      behavior: "smooth"
    });
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

  scrollTo(sel: string) {
    document.querySelector(`${sel}`)?.scrollIntoView({ behavior: "smooth" });
  }

  private onScroll() {
    const scrollbarWidth = this.nativeElement.offsetWidth - this.nativeElement.clientWidth;
    const offsetHeight = this.nativeElement.offsetHeight + scrollbarWidth;

    // Rotation:
    const rotH = 0.5 + ((this.nativeElement.scrollTop + offsetHeight / 2) % offsetHeight) / offsetHeight;
    const rotateY = `${rotH * 180 - 180}deg`;
    this.nativeElement.style.setProperty("--rotateY", rotateY);

    // Opacity:
    let opacH = (((this.nativeElement.scrollTop + offsetHeight) % offsetHeight) / offsetHeight) % 1;
    if (opacH < 0.5) {
      opacH = 1 - opacH;
    }
    if (opacH === 0) opacH = 1;
    opacH = (opacH - 1) * 2 + 1;
    opacH = opacH * opacH;
    const opacity = `${opacH}`;
    this.nativeElement.style.setProperty("--opacity", opacity);
  }
}
