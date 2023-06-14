import { Component } from "@angular/core";
import { DemoStyleColorCellRenderer } from "../stylecolor/demo-style-color-cell-renderer";
import { DefaultRowHeights, Factory } from "@guiexpert/table";
import { DemoStyleAreaModel } from "../stylecolor/demo-style-area-model";

@Component({
  selector: "demo-ultra",
  templateUrl: "./demo-ultra.component.html",
  styleUrls: ["./demo-ultra.component.css"]
})
export class DemoUltraComponent {

  private readonly squareSize = 8;
  private readonly colCount = 800;
  private readonly rowCount = 800;


  tableModel = Factory.createTableModel({
    bodyAreaModel: new DemoStyleAreaModel(this.rowCount, this.colCount, this.squareSize, new DemoStyleColorCellRenderer()),
    defaultRowHeights: new DefaultRowHeights(0, this.squareSize, 0),
    columnSizes: new Array(this.colCount).fill(this.squareSize)
  });


}

