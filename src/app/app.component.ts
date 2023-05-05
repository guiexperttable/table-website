import { Component, ElementRef, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";

@Component({
  selector: "guiexpert-table-doc-root",
  templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit {

  constructor(
    private readonly router: Router,
    private readonly elementRef: ElementRef
  ) {
  }

  ngOnInit(): void {
    this.router
      .events
      // .pipe(takeWhile(() => this.alive))
      .subscribe(evt => {
        if (evt instanceof NavigationEnd) {
          const clazz = this.classByUrl(evt.url);
          this.elementRef.nativeElement.removeAttribute("class");
          this.elementRef.nativeElement.classList.add(clazz);
        }
      });
  }

  private classByUrl(url: string): string {
    if (url.includes("/doc")) return "doc";
    if (url.includes("/api")) return "api";
    if (url.includes("/demo")) return "demo";
    if (url.includes("/welcome")) return "welcome";
    if (url.includes("/privacy")) return "welcome";
    if (url.includes("/cou")) return "welcome";
    if (url.includes("/imprint")) return "welcome";
    return "xxx";
  }


}
