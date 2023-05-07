import { Component } from "@angular/core";


@Component({
  selector: "demo-simple-info",
  template: `
    infos todo`,
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
export class DemoSimpleInfoComponent {

}

