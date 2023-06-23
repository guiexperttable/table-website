import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map, shareReplay, takeWhile } from "rxjs/operators";
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from "@angular/router";
import { MatSidenav, MatSidenavContent } from "@angular/material/sidenav";
import { environment } from "../../environments/environment";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent implements OnInit, OnDestroy {


  @ViewChild("drawer", { static: true }) mainNav?: MatSidenav;
  @ViewChild("matSidenavContent", { static: true }) matSidenavContent?: MatSidenavContent;

  version = environment.version;
  commitHash = environment.commitHash;
  title = "";
  fadein = true;
  lawInSidenavVisible = true;
  demoActionBarVisible = false;
  customHeaderVisible = true;
  customThemePickerButtonVisible = false;

  runLink = "";
  infoLink = "";
  menuForcedClosed = false;
  picker = location.href.includes("/picker"); // Once a picker, always a picker.
  public closed = true;

  protected readonly location = location;
  protected readonly toolbar = toolbar;
  private alive = true;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    takeWhile(() => this.alive),
    map(result => result.matches),
    shareReplay()
  );
  private readonly customThemePickerDemos = [
    "simple",
    "treepeople",
    "timetable",
    "prizes",
    "mouseevent",
    "rowandcolspan",
    "idfilter",
    "olympic",
    "laf"
  ];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly cdr: ChangeDetectorRef
  ) {
  }

  onClosedStart() {
    this.closed = true;
  }

  onOpenStart() {
    this.closed = false;
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  ngOnInit() {
    // this.calcTitle(this.router.url);

    this.router.events.pipe(takeWhile(() => this.alive)).subscribe(evt => {
      if (evt instanceof NavigationStart) {
        this.fadein = false;
        this.cdr.detectChanges();

      } else if (evt instanceof NavigationEnd) {
        this.matSidenavContent?.scrollTo({ top: 0, left: 0 });
        this.lawInSidenavVisible = evt.url === "/" || evt.url.includes("/welcome") || evt.url.includes("/law");
        this.customHeaderVisible =
          evt.url === "/"
          || evt.url.includes("/welcome")
          || evt.url.includes("/demos")
          || evt.url.includes("/license")
          || evt.url.includes("/doc")
          || evt.url.includes("/api")
          || evt.url.includes("/law")
          || evt.url.includes("/pricing")
          || evt.url.includes("/generator")
          || evt.url.includes("/getstarted");

        this.menuForcedClosed = evt.url.includes("/themes/custom");
        this.demoActionBarVisible = evt.url.includes("/demo/");
        this.customThemePickerButtonVisible = this.isCustomThemePickerVisible(evt.url);

        const p = evt.url.replace("info", "").replace("run", "");
        this.infoLink = p + "/info";
        this.runLink = p + "/run";
        this.cdr.detectChanges();
      }
    });
  }


  openCustomThemePicker() {
    const m = location.pathname.match(/\/demo\/(.*?)\/run/);
    const p = m ? "#" + m[1] : "";
    window.open(
      "http://localhost:4200/themes/custom/picker" + p,
      "_blank",
      "left=100,top=100,width=720,height=755,location=0,scrollbars=0,status=0");
  }

  private isCustomThemePickerVisible(url: string) {
    const m = url.match(/.*\/demo\/(.*?)\/run/);
    if (m && m[1]) {
      return this.customThemePickerDemos.includes(m[1]);
    }
    return false;
  }
}
