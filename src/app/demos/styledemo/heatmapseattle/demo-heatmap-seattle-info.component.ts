import { Component } from "@angular/core";


@Component({
  selector: "demo-heatmap-seattle-info",
  template: `
    infos todo heatmap`,
  styles: [`
    :host {
      display: grid;
      grid-template-rows: 1fr;
    }

    :host > * {
      margin: 0;
      width: 100%;
      height: 100%;
    }
  `]
})
export class DemoHeatmapSeattleInfoComponent {

}

