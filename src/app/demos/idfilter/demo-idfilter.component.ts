import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import {
  ColumnDef,
  ColumnDefIf,
  px120,
  px150,
  px250,
  px50,
  TableApi,
  TableModelFactory,
  TableModelIf,
  TableOptions,
  TableOptionsIf
} from "@guiexpert/table";
import { SimplePersonIf } from "@guiexpert/demo-table-models";

@Component({
  selector: "demo-idfilter",
  templateUrl: "./demo-idfilter.component.html",
  styleUrls: ["./demo-idfilter.component.css"]
})
export class DemoIdfilterComponent implements OnInit {

  tableModel?: TableModelIf;

  tableOptions: TableOptionsIf = {
    ...new TableOptions(),
    hoverColumnVisible: false,
    defaultRowHeights: {
      header: 34,
      body: 34,
      footer: 0
    },
    externalFilterFunction: this.filterFn.bind(this)
  };

  filterMinimalId = 990;

  private tableApi?: TableApi;

  constructor(
    private readonly http: HttpClient,
    private readonly cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.http
      .get<SimplePersonIf[]>("/assets/demo/persons1000.json")
      .subscribe(this.onDataLoaded.bind(this));
  }


  onTableReady($event: TableApi) {
    this.tableApi = $event;
  }

  filterValueChanged(evt: number) {
    this.filterMinimalId = evt;
    if (this.tableApi) {
      this.tableApi.externalFilterChanged();
      this.tableApi.repaint();
    }
  }

  private filterFn(value: SimplePersonIf, _index: number, _array: SimplePersonIf[]) {
    return value.id > this.filterMinimalId;
  }

  private onDataLoaded(data: SimplePersonIf[]) {

    const columnDefs: ColumnDefIf[] = [
      new ColumnDef("firstName", "First Name", px120),
      new ColumnDef("lastName", "Last Name"),
      ColumnDef.create({
        property: "email",
        headerLabel: "Email",
        width: px250,
        bodyClasses: ["ge-table-text-align-left"]
      }),
      new ColumnDef("ipAddress", "IP", px150),
      new ColumnDef("id", "ID", px50)
    ];

    this.tableModel = TableModelFactory.buildByTypedRowsParam<SimplePersonIf>({
      rows: data,
      columnDefs,
      tableOptions: this.tableOptions,
      fixedLeftColumnCount: 2
    });
    this.cdr.detectChanges();
  }
}
