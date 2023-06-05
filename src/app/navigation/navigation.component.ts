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

  private static readonly config = {
    routeTitles: {
      home: "",
      welcome: "",
      angular: "Get Started Angular",
      vue: "Get Started Vue3",
      svelte: "Get Started Svelte",
      preact: "Get Started Preact",
      react: "Get Started React",
      solid: "Get Started Solid",
      plainjs: "Get Started Plain JS",
      webcomponent: "Get Started Web Component",
      getstarted: "Get Started",
      demosimple: "Demo Simpe Model",
      demoprizes: "Demo Nobel Prices",
      demomouseevent: "Demo Mouse Events ",
      demostyledemosimple: "Demo Simpe Cell Renderer",
      demostyledemoheatmaptemp: "Demo Temperature Heatmap",
      demostyledemoheatmapseattle: "Demo Seattle Annual Temperatures",
      demorowandcolspan: "Demo Colspan & Rowspan",
      demotimetable: "Demo Time Table",
      demotreepeople: "Demo People Tree Table",
      demolaf: "Demo Look and Feel (CSS)",
      demoidfilter: "Demo Slider Filter",
      demoolympic: "Demo Input Filter",
      democrypto: "Demo Crypto Table",
      demoheaderdblclick: "Demo Sorting Rows",

      demos: "",
      demo: "Demo",
      api: "API",
      doc: "Documentation",
      privacy: "Privacy Policy",
      cou: "Conditions of Use",
      imprint: "Imprint",
      license: "License",
      pricing: "Pricing",
      custom: "Custom Theme Generator"
    },
    titleFadeIn: true
  };

  @ViewChild("drawer", { static: true }) mainNav?: MatSidenav;
  @ViewChild("matSidenavContent", { static: true }) matSidenavContent?: MatSidenavContent;

  version = environment.version;
  commitHash = environment.commitHash;
  title = "";
  fadein = true;
  lawInSidenavVisible = true;
  footerVisible = true;
  actionBarVisible = false;
  toolbarVisible = false;
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
    this.calcTitle(this.router.url);

    this.router.events.pipe(takeWhile(() => this.alive)).subscribe(evt => {
      if (evt instanceof NavigationStart) {
        this.fadein = false;
        this.cdr.detectChanges();

      } else if (evt instanceof NavigationEnd) {
        this.matSidenavContent?.scrollTo({ top: 0, left: 0 });
        this.calcTitle(evt.url);

        this.lawInSidenavVisible = evt.url === "/" || evt.url.includes("/welcome") || evt.url.includes("/law");
        this.footerVisible =
          !evt.url.includes("/tsdoc")
          && !evt.url.includes("/getstarted")
          && !evt.url.includes("/themes")
          && !evt.url.includes("/demo");

        this.customHeaderVisible =
          evt.url ==='/'
          || evt.url.includes("/welcome")
          || evt.url.includes("/demos")
          || evt.url.includes("/license")
          || evt.url.includes("/doc")
          || evt.url.includes("/getstarted");

        console.info("evt.url", evt.url);
        console.info("this.title", this.title);
        this.toolbarVisible = !!this.title && !evt.url.includes("/themes/custom/picker");
        // && !evt.url.includes("/welcome");
        this.menuForcedClosed = evt.url.includes("/themes/custom");
        this.actionBarVisible = evt.url.includes("/demo/");
        this.customThemePickerButtonVisible = this.isCustomThemePickerVisible(evt.url);

        const p = evt.url.replace("info", "").replace("run", "");
        this.infoLink = p + "/info";
        this.runLink = p + "/run";
        this.cdr.detectChanges();
      }
    });
  }

  calcTitle(url: string) {
    const routeTitles = NavigationComponent.config.routeTitles;
    url = url.replace(/\//g, "");
    const keys = Object.keys(routeTitles);
    for (const key of keys) {
      if (url.indexOf(key) > -1) {
        // @ts-ignore
        this.setTitle(routeTitles[key]);
        return;
      }
    }
    this.setTitle("");
  }

  setTitle(title: string) {
    this.title = title;
    this.fadein = NavigationComponent.config.titleFadeIn;
    this.cdr.detectChanges();
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
