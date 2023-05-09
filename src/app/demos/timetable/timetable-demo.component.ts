import { ChangeDetectionStrategy, Component } from "@angular/core";
import { TableApi, TableCellUpdateEvent, TableModelIf, TableOptionsIf } from "@guiexpert/table";
import { COL_IDX_UPDATED_AT, createTimeTableModel, tableOptions } from "@guiexpert/demo-table-models";

@Component({
  selector: "timetable-demo",
  templateUrl: "./timetable-demo.component.html",
  styleUrls: ["./timetable-demo.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimetableDemoComponent {


  tableModel?: TableModelIf = createTimeTableModel();
  tableOptions: TableOptionsIf = tableOptions;
  running = true;
  private tableApi?: TableApi;


  onTableReady(api: TableApi) {
    this.tableApi = api;
    this.sendUpdateTableModelEvents();
  }

  sendUpdateTableModelEvents() {
    if (!this.running || !this.tableApi) {
      return; // skip
    }

    // we try to send 60 times per second with each 1-3 items:
    const eventCount = Math.round(1 + 3 * Math.random());
    const events: TableCellUpdateEvent[] = [];
    const rowIdxes: number[] = [];
    const rowMax = this.tableModel?.getBodyModel().getRowCount() ?? 0;

    for (let i = 0; i < eventCount; i++) {
      const val = Math.floor(999 * Math.random());
      const col = this.rndm(4, COL_IDX_UPDATED_AT - 1);
      const row = this.rndm(0, rowMax);

      if (!rowIdxes.includes(row)) {
        rowIdxes.push(row);
      }

      events.push(new TableCellUpdateEvent(row, col, val));
    }
    const now = new Date();
    rowIdxes.forEach(
      r => events.push(new TableCellUpdateEvent(r, COL_IDX_UPDATED_AT, now))
    );

    // Do the update:
    this.tableApi?.updateTableCells(events);

    setTimeout(() => {
      this.sendUpdateTableModelEvents();
    }, 16);
  }

  rndm(from: number, to: number) {
    return Math.min(to, Math.floor(from + (to - from) * Math.random()));
  }
}
