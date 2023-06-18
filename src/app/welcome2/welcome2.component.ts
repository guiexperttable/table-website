import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnDestroy, OnInit } from "@angular/core";
import { DOCUMENT } from "@angular/common";


@Component({
  selector: "app-doc-welcome",
  templateUrl: "./welcome2.component.html",
  styleUrls: ["./welcome2.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Welcome2Component implements OnInit, OnDestroy {


  private observer?: IntersectionObserver;
  private nativeElement: HTMLDivElement;

  constructor(
    private readonly elementRef: ElementRef,
    @Inject(DOCUMENT) private readonly document: Document
  ) {
    this.nativeElement = this.elementRef.nativeElement;
    this.nativeElement.addEventListener("scroll", this.onScroll.bind(this), false);
  }

  // scrollDown() {
  //   const h = document.body.offsetHeight;
  //   this.nativeElement.scrollBy({
  //     top: h,
  //     left: 0,
  //     behavior: "smooth"
  //   });
  // }
  //
  // scroll2Top() {
  //   this.nativeElement.scrollBy({
  //     top: -99999,
  //     left: 0,
  //     behavior: "smooth"
  //   });
  // }
  //
  // scrollTo(sel: string) {
  //   document.querySelector(`${sel}`)?.scrollIntoView({ behavior: "smooth" });
  // }



  ngOnInit(): void {
    // this.observer = new IntersectionObserver(entries =>
    //   entries
    //     .forEach(entry => {
    //         if (entry.isIntersecting) {
    //           entry.target.classList.add("show");
    //         } else {
    //           entry.target.classList.remove("show");
    //         }
    //       }
    //     ));
    // this.document
    //   .querySelectorAll("section")
    //   .forEach(el => this.observer?.observe(el));
  }

  ngOnDestroy(): void {
    // this.observer?.disconnect();
  }



  private onScroll() {
    const scrollbarWidth = this.nativeElement.offsetWidth - this.nativeElement.clientWidth;
    const offsetHeight = this.nativeElement.offsetHeight + scrollbarWidth;

    // Rotation:
    const r = this.nativeElement.scrollTop * 360 /  (4*offsetHeight);
    this.nativeElement.style.setProperty("--ge-welcome-rotate", `${-r}deg`);

    // Opacity:
    // let opacH = (((this.nativeElement.scrollTop + offsetHeight) % offsetHeight) / offsetHeight) % 1;
    // if (opacH < 0.5) {
    //   opacH = 1 - opacH;
    // }
    // if (opacH === 0) opacH = 1;
    // opacH = (opacH - 1) * 2 + 1;
    // opacH = opacH * opacH;
    // const opacity = `${opacH}`;
    // this.nativeElement.style.setProperty("--opacity", opacity);
  }
}
