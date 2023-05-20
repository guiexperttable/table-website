import {
  AreaIdent,
  AreaModelIf,
  CellRendererIf, CheckboxBooleanPropertyCellRenderer, CheckboxColumn,
  ColumnDef,
  ColumnDefIf,
  DomServiceIf,
  px150,
  px250, px50,
  px60,
  RendererCleanupFnType, SelectionModel,
  TableModelFactory,
  TableModelIf,
  TableOptions,
  TableOptionsIf
} from "@guiexpert/table";
import { OkLch } from "./ok-lch";
import { ThemeRowIf } from "./theme-row.If";
import { ThemeRow } from "./theme-row";

const CSS_LIST = [
  "header-center-bg",
  "header-east-bg",
  "header-west-text",
  "header-center-text",
  "header-east-text",

  "header-west-horizontal-border",
  "header-west-vertical-border",
  "header-center-horizontal-border",
  "header-center-vertical-border",
  "header-east-horizontal-border",
  "header-east-vertical-border",

  "header-west-selected-range-bg",
  "header-center-selected-range-bg",
  "header-east-selected-range-bg",
  "header-west-selected-range-text",
  "header-center-selected-range-text",
  "header-east-selected-range-text",


  "body-west-bg",
  "body-center-bg",
  "body-east-bg",

  "body-west-text",
  "body-center-text",
  "body-east-text",

  "body-west-horizontal-border",
  "body-west-vertical-border",
  "body-center-horizontal-border",
  "body-center-vertical-border",
  "body-east-horizontal-border",
  "body-east-vertical-border",

  "body-west-selected-range-bg",
  "body-center-selected-range-bg",
  "body-east-selected-range-bg",
  "body-west-selected-range-text",
  "body-center-selected-range-text",
  "body-east-selected-range-text",

  "footer-west-bg",
  "footer-center-bg",
  "footer-east-bg",

  "footer-west-text",
  "footer-center-text",
  "footer-east-text",

  "footer-west-horizontal-border",
  "footer-west-vertical-border",
  "footer-center-horizontal-border",
  "footer-center-vertical-border",
  "footer-east-horizontal-border",
  "footer-east-vertical-border",

  "footer-west-selected-range-bg",
  "footer-center-selected-range-bg",
  "footer-east-selected-range-bg",
  "footer-west-selected-range-text",
  "footer-center-selected-range-text",
  "footer-east-selected-range-text",


  "border ",
  "selected-range-bg",

  "row-odd-bg",
  "row-even-bg",
  "column-odd-bg",
  "column-even-bg",

  "hover-column-bg",
  "hover-row-bg",
  "focus-border",

  "color-error-text",
  "tree-arrow-collapsed-color",
  "column-resize-handle-border",

  "dragged-col-div-bg",
  "drop-zone-bg"
];


export class OkLchCellRenderer implements CellRendererIf {

  render(
    cellDiv: HTMLDivElement,
    _rowIndex: number,
    _columnIndex: number,
    _areaIdent: AreaIdent,
    _areaModel: AreaModelIf,
    cellValue: any,
    _domService: DomServiceIf): RendererCleanupFnType | undefined {
    if (cellValue) {
      cellDiv.innerText = (cellValue as OkLch).toCssString();
    }
    return undefined;
  }

}


export function createTableOptions(): TableOptions {
  const selectionModel = new SelectionModel("row", "multi");
  const tableOptions: TableOptionsIf = {
    ...new TableOptions(),
    hoverColumnVisible: false,
    hoverRowVisible: true,
    defaultRowHeights: {
      header: 40,
      body: 34,
      footer: 34
    },
    getSelectionModel: () => selectionModel
  };
  return tableOptions;
}

export function createColumnDefs(): ColumnDefIf[] {
  return [
    ColumnDef.create({
      property: "selected",
      headerLabel: " ",
      width: px50,
      bodyRenderer: new CheckboxBooleanPropertyCellRenderer<ThemeRowIf>('selected')
    }),
    new ColumnDef("id", "CSS var", px250),
    new ColumnDef("area", "Area", px60),
    new ColumnDef("side", "Side", px60),
    new ColumnDef("type", "Type", px60),
    ColumnDef.create({
      property: "okLch",
      headerLabel: "ok LCH",
      width: px150,
      bodyRenderer: new OkLchCellRenderer()
    }),
    new ColumnDef("value", "CSS Value", px150),
  ];
}

function createTableRows(): ThemeRowIf[] {
  return CSS_LIST.map( (l,i) => {
    return new ThemeRow(
      i<5,
      l,
      "body",
      "west",
      "bg",
      new OkLch(100, 0.2, 50, 100)
    );
  });
}

export function createThemeTableModel(): TableModelIf {
  const tableOptions = createTableOptions();
  const rows: ThemeRowIf[] = createTableRows();
  console.info(rows);
  const columnDefs: ColumnDefIf[] = createColumnDefs();
  return TableModelFactory.buildByTypedRowsParam({
    rows,
    columnDefs,
    tableOptions,
    fixedLeftColumnCount: 2
  });
}


