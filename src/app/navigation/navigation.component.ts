import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map, shareReplay, takeWhile } from "rxjs/operators";
import { ActivatedRoute, NavigationEnd, NavigationStart, Route, Router } from "@angular/router";
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
      home: "Welcome!",
      angular: "Get Started Angular",
      vue: "Get Started Vue3",
      svelte: "Get Started Svelte",
      preact: "Get Started Preact",
      react: "Get Started React",
      solid: "Get Started Solid",
      plainjs: "Get Started Plain JS",
      webcomponent: "Get Started Web Component",
      getstarted: "Get Started",
      demo: "Demos",
      api: "API",
      doc: "Documentation",
      privacy: "Privacy",
      cou: "Conditions of Use",
      imprint: "Imprint"
    },
    titleFadeIn: true
  };

  @ViewChild("drawer", { static: true }) mainNav?: MatSidenav;
  @ViewChild("matSidenavContent", { static: true }) matSidenavContent?: MatSidenavContent;

  version = environment.version;
  commitHash = environment.commitHash;
  title = "Welcome!";
  fadein = true;
  lawInSidenavVisible = true;
  footerVisible = true;
  actionBarVisible = false;

  route?: Route;
  runLink = "";
  infoLink = "";

  protected readonly location = location;
  private alive = true;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    takeWhile(() => this.alive),
    map(result => result.matches),
    shareReplay()
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly cdr: ChangeDetectorRef
  ) {
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
          && !evt.url.includes("/demo");

        this.actionBarVisible = evt.url.includes("/demo/");

        const p = evt.url.replace("info", "").replace("run", "");
        this.infoLink = p + "/info";
        this.runLink = p + "/run";
        this.cdr.detectChanges();
      }
    });
  }

  calcTitle(url: string) {
    url = url.replace(/\//g, "");
    const routeTitles = NavigationComponent.config.routeTitles;
    const keys = Object.keys(routeTitles);
    for (const key of keys) {
      if (url.indexOf(key) > -1) {
        // @ts-ignore
        this.setTitle(routeTitles[key]);
        return;
      }
    }
    this.setTitle("Welcome!");
  }

  setTitle(title: string) {
    this.title = title;
    this.fadein = NavigationComponent.config.titleFadeIn;
    this.cdr.detectChanges();
  }
}
