import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import {
  ColumnDef,
  ColumnDefIf, DefaultRowHeights,
  FalseFn,
  px120,
  px200,
  px40,
  TableApi,
  TableFactory,
  TableModelIf,
  TableOptions,
  TableOptionsIf
} from "@guiexpert/table";
import { RenderWrapperFactory } from "@guiexpert/angular-table";
import { DummyDataIf } from "./data/dummy-data.if";

@Component({
  selector: "demo-cellgroup",
  templateUrl: "./demo-cellgroup.component.html",
  styleUrls: ["./demo-cellgroup.component.css"]
})
export class DemoCellgroupComponent implements OnInit {

  tableModel?: TableModelIf;
  mheaderGroups = headerGroups;

  tableOptions: TableOptionsIf = {
    ...new TableOptions(),
    hoverColumnVisible: false,
    defaultRowHeights: new DefaultRowHeights()
  };


  private tableApi?: TableApi;

  constructor(
    private readonly http: HttpClient,
    private readonly cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.http
      .get<DummyDataIf[]>("/assets/demo/dummy-10000.json")
      .subscribe(this.onDataLoaded.bind(this));
  }


  onTableReady($event: TableApi) {
    this.tableApi = $event;
  }


  private onDataLoaded(data: DummyDataIf[]) {

    const columnDefs: ColumnDefIf[] = [
      new ColumnDef("name", "Name", px200),
      ColumnDef.create({
        property: "age",
        headerLabel: "Age",
        width: px40,
        sortIconVisible: FalseFn
      }),
      new ColumnDef("favoriteFruit", "Favorite Fruit", px120)
    ];

    this.tableModel = TableFactory.createTableModel({
      rows: data,
      columnDefs,
      tableOptions: this.tableOptions,
      fixedLeftColumnCount: 1,
      fixedRightColumnCount: 1
    });
    this.cdr.detectChanges();
  }
}
