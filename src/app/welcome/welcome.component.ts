import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnDestroy, OnInit } from "@angular/core";
import { DOCUMENT } from "@angular/common";

// TODO component bauen
export class TxtType {

  public loopNum = 0;
  public txt = '';
  public isDeleting = false;
  public el?: HTMLDivElement;
  public toRotate: string[] =[
    "Handle large datasets easily",
    "Fully-featured (advanced sorting and filtering)",
    "Highly customizable data grid",
    "Outstanding performance",
    "No third-party dependencies",
    "UI-agnostic",
  ];
  public period = 2000


  public tick() {
    const i = this.loopNum % this.toRotate.length;
    const fullTxt = this.toRotate[i];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

   if (this.el) this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    const that = this;
    let delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(function() {
      that.tick();
    }, delta);
  }

  // public init(){
  //
  //     const toRotate = this.el.getAttribute("data-type");
  //     const period = this.el.getAttribute("data-period");
  //     if (toRotate) {
  //       new TxtType(this.el, JSON.parse(toRotate), 2000);
  //     }
  //   }
  //   // INJECT CSS
  //   const css = document.createElement("style");
  //   css.type = "text/css";
  //   css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  //   document.body.appendChild(css);
  // }
}



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
