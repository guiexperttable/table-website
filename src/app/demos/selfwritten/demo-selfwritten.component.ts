import { Component } from "@angular/core";
import {
  AbstractAreaModel,
  AreaModelArrayOfArrays,
  AreaModelIf,
  TableModelFactory,
  TableModelIf
} from "@guiexpert/table";
import { SelfwrittenAreaModel } from "./selfwritten-area-model";


@Component({
  selector: "demo-simple",
  template: `
    <guiexpert-table  [tableModel]="tableModel"></guiexpert-table>`,

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
export class DemoSelfwrittenComponent {

  tableModel: TableModelIf;

  constructor() {
    this.tableModel = TableModelFactory.createByAreaModelsParam({
      bodyAreaModel: new SelfwrittenAreaModel(),
      columnCount: 6,
      rowCheckboxVisible: false,
      overridingColumnWidth: 100
    });
  }



}
