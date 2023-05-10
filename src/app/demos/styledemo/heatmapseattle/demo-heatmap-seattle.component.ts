import { Component } from "@angular/core";
import { TableModelIf, TableOptions, TableOptionsIf } from "@guiexpert/table";
import { createHeatMapSeattleModel } from "@guiexpert/demo-table-models";


@Component({
  selector: "demo-heatmap-seattle",
  template: `
    <guiexpert-table
      [tableModel]="tableModel"
      [tableOptions]="tableOptions"
    ></guiexpert-table>`,
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
export class DemoHeatmapSeattleComponent {

  tableModel?: TableModelIf = createHeatMapSeattleModel();
  tableOptions: TableOptionsIf = {
    ...new TableOptions(),
    hoverColumnVisible: false,
    hoverRowVisible: false,
    columnsDraggable: false,
    columnsResizable: false,
    tableTopBorderVisible: false,
    tableBottomBorderVisible: false,
    horizontalBorderVisible: false,
    verticalBorderVisible: false
  };
}

