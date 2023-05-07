import { Component } from "@angular/core";
import { TableModelIf } from "@guiexpert/table";
import { generateSimpleModel } from "@guiexpert/demo-table-models";


@Component({
  selector: "demo-simple",
  template: `
    <guiexpert-table [tableModel]="tableModel"></guiexpert-table>`,
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
export class DemoSimpleComponent {

  tableModel: TableModelIf = generateSimpleModel(1000, 100);

}

