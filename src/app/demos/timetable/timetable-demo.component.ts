import { ChangeDetectionStrategy, Component } from "@angular/core";
import { TableModelIf, TableOptionsIf } from "@guiexpert/table";
import { createTimeTableModel, tableOptions } from "@guiexpert/demo-table-models";

@Component({
  selector: "timetable-demo",
  templateUrl: "./timetable-demo.component.html",
  styleUrls: ["./timetable-demo.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimetableDemoComponent {

  tableModel?: TableModelIf = createTimeTableModel();
  tableOptions: TableOptionsIf = tableOptions;

}
