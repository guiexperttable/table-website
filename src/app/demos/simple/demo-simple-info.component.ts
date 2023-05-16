import { Component } from "@angular/core";


@Component({
  selector: "demo-simple-info",
  template: `
    <div class="ge-padding">
      <p>
        Add the table tag to your template.
        The syntax will depend on the framework you are using.
        Here is an example of the Angular syntax:
      </p>
      <source-code [language]="'language-markup'" [text]="tag"></source-code>

      <p>
        In this example we used this helper method to create a table model:
      </p>
      <source-code [text]="model"></source-code>

      <p>
        See:
      </p>
      <source-code [text]="full"></source-code>

    </div>
  `,
  styles: [`
    :host {
      display: grid;
      grid-template-rows: 1fr;
    }

    :host > * {
      margin: 0;
      width: calc(100% - 32px);
      height: 100%;
    }
  `]
})
export class DemoSimpleInfoComponent {
  tag = `<guiexpert-table [tableModel]="tableModel"></guiexpert-table>`;
  model = `tableModel: TableModelIf = generateSimpleModel(1000, 100);`;
  full = `
  import { TableModelFactory, TableModelIf } from "@guiexpert/table";

export function generateSimpleModel(
  rowCount: number = 1000,
  columnCount: number = 1000
): TableModelIf {

  const data: string[][] = [];
  for (let r = 0; r < rowCount; r++) {
    const row: string[] = [];
    data.push(row);
    for (let c = 0; c < columnCount; c++) {
      row.push(\`\${r}/\${c}\`);
    }
  }

  const labels: string[] = [];
  for (let c = 0; c < columnCount; c++) {
    labels.push(\`col \${c}\`);
  }

  const footer: string[][] = [];
  for (let r = 0; r < 2; r++) {
    const row: string[] = [];
    footer.push(row);
    for (let c = 0; c < columnCount; c++) {
      row.push(\`F\${r}/\${c}\`);
    }
  }
  const overridingColumnWidth = 100;
  return TableModelFactory.createByArrayOfArraysParams({
    columnLabels: [labels],
    data,
    footer,
    overridingColumnWidth,
    fixedLeftColumnCount: 1,
    fixedRightColumnCount: 1
  });
}

  `;
}

