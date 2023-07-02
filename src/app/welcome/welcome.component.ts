import { ChangeDetectionStrategy, Component, ElementRef, HostListener, Inject, OnInit } from "@angular/core";
import { DOCUMENT } from "@angular/common";


@Component({
  selector: "app-doc-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeComponent implements OnInit {


  private nativeElement: HTMLDivElement;
  private headlines = [
    " ",
    "Excellent performance",
    "High Interactivity",
    "Extreme Customizable",
    "Open Source"
  ];

  constructor(
    private readonly elementRef: ElementRef,
    @Inject(DOCUMENT) private readonly document: Document
  ) {
    this.nativeElement = this.elementRef.nativeElement;
    this.nativeElement.addEventListener("scroll", this.onScroll.bind(this), false);

    this.nativeElement.style.setProperty("--ge-welcome-scrolldown-display", `block`);
    this.nativeElement.style.setProperty("--ge-welcome-scrolldown-display-else", `none`);
    this.nativeElement.style.setProperty("--ge-stroke-dashoffset", "283");
  }

  @HostListener("window:resize", ["$event"])
  onResize(_event?: Event) {
    let s = Math.min(this.nativeElement.clientWidth / 2, this.nativeElement.clientHeight / 2);
    s = Math.min(400, Math.max(200, s));
    this.nativeElement.style.setProperty("--ge-welcome-img-width-number", `${s}`);
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

  scroll2Bottom() {
    this.nativeElement.scrollBy({
      top: 99999,
      left: 0,
      behavior: "smooth"
    });
  }

  ngOnInit(): void {
    this.onResize();
  }

  private onScroll() {
    const offsetHeight = this.nativeElement.clientHeight;
    const scrollHeight = this.nativeElement.scrollHeight;
    const scrollTop = this.nativeElement.scrollTop;

    // Rotation:
    const r0 = (scrollTop - offsetHeight) * 360 / (4 * offsetHeight);
    const r1 = Math.max(-270, Math.min(270, r0));

    // scroll circle indicator:
    const dashBoardOffset = (283 * (1.001 - (scrollTop / (scrollHeight - offsetHeight))));

    // Zoom:
    let zoom = r0 <= 275 ? 1 : ((r0 - 275) / 4);
    if (zoom < 1) {
      zoom = 1;
    }
    zoom = Math.min(10, zoom);
    const headlinesIdx = Math.min(this.headlines.length - 1, Math.round(scrollTop / offsetHeight));
    const opacity = scrollTop > (4.5 * offsetHeight) ? 0 : 1;
    const displayHeroText = zoom > 2 ? "none" : "grid";

    const displayScrollDown = (scrollTop > scrollHeight - offsetHeight * 1.9) ? "none" : "block";
    const displayScrollDownElse = (displayScrollDown === "block") ? "none" : "block";

    const oklchPerc = 100 - Math.min(100, Math.max(scrollTop / offsetHeight, 0)) * 100;
    const heroTextColor = `oklch(${oklchPerc}% 0 0)`; // oklch(100% 0 0) = #fff,  oklch(0% 0 0) = #000

    this.nativeElement.style.setProperty("--ge-hero-text-color", `${heroTextColor}`);
    this.nativeElement.style.setProperty("--ge-stroke-dashoffset", `${dashBoardOffset}`);
    this.nativeElement.style.setProperty("--ge-welcome-rotate", `${-r1}deg`);
    this.nativeElement.style.setProperty("--ge-welcome-zoom", `${zoom}`);
    this.nativeElement.style.setProperty("--ge-welcome-opacity", `${opacity}`);
    this.nativeElement.style.setProperty("--ge-welcome-scrolldown-display", `${displayScrollDown}`);
    this.nativeElement.style.setProperty("--ge-welcome-scrolldown-display-else", `${displayScrollDownElse}`);
    this.nativeElement.style.setProperty("--ge-headline-hero-super-content", "'" + this.headlines[headlinesIdx] + "'");
    this.nativeElement.style.setProperty("--ge-headline-hero-super-display", displayHeroText);

    // Rotation of feature images:
    const rotH = 0.5 + ((scrollTop + offsetHeight / 2) % offsetHeight) / offsetHeight;
    const rotDeg = -(rotH * 180 - 180);
    const rotateY = `${rotDeg}deg`;
    this.nativeElement.style.setProperty("--ge-welcome-rotate-feature-img", rotateY);


    // const wbas = document.querySelectorAll(".willBeAnimated");
    // const limit = window.innerHeight * 0.9;
    // for (let i = 0; i < wbas.length; i++) {
    //   const r = wbas[i].getBoundingClientRect();
    //   if (r.top < limit) {
    //     this.addClass(wbas[i], "willBeAnimated", false);
    //     this.addClass(wbas[i], "animated", true);
    //     this.addClass(wbas[i], "fadeInUp", true);
    //   }
    // }
  }

  // addClass(ele: Element, clazz: string, add: boolean) {
  //   if (ele.classList.contains(clazz)) {
  //     if (!add) ele.classList.remove(clazz);
  //   } else {
  //     if (add) ele.classList.add(clazz);
  //   }
  // }

}
