import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnDestroy, OnInit } from "@angular/core";
import { DOCUMENT } from "@angular/common";


@Component({
  selector: "app-doc-welcome-2",
  templateUrl: "./welcome2.component.html",
  styleUrls: ["./welcome2.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Welcome2Component {


  private nativeElement: HTMLDivElement;

  constructor(
    private readonly elementRef: ElementRef,
    @Inject(DOCUMENT) private readonly document: Document
  ) {
    this.nativeElement = this.elementRef.nativeElement;
    this.nativeElement.addEventListener("scroll", this.onScroll.bind(this), false);
  }


  scrollTo(sel: string) {
    document.querySelector(`${sel}`)?.scrollIntoView({ behavior: "smooth" });
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


  private onScroll() {
    const scrollbarWidth = this.nativeElement.offsetWidth - this.nativeElement.clientWidth;
    const offsetHeight = this.nativeElement.offsetHeight + scrollbarWidth;

    // Rotation:
    const scrollTop = this.nativeElement.scrollTop;
    const r0 = scrollTop * 360 / (4 * offsetHeight);
    const r1 = Math.min(270, r0);

    // Zoom:
    let zoom = r0 <= 275 ? 1 : ((r0 - 275)/4);
    if (zoom < 1) {
      zoom = 1;
    }
    zoom = Math.min(10, zoom);

    const opacity = scrollTop > 3700 ? 0 : 1;

    this.nativeElement.style.setProperty("--ge-welcome-rotate", `${-r1}deg`);
    this.nativeElement.style.setProperty("--ge-welcome-zoom", `${zoom}`);
    this.nativeElement.style.setProperty("--ge-welcome-opacity", `${opacity}`);

    // Rotation of feature images:
    const rotH = 0.5 + ((scrollTop + offsetHeight / 2) % offsetHeight) / offsetHeight;
    const rotateY = `${rotH * 180 - 180}deg`;
    this.nativeElement.style.setProperty("--ge-welcome-rotate-feature-img", rotateY);
  }
}
