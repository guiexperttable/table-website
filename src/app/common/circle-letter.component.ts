import { ChangeDetectionStrategy, Component, Input } from "@angular/core";


@Component({
  selector: "circle-letter",
  template: `
    <div>
      <label [innerText]="text"></label>
    </div>`,
  styles: [`
      :host {
        display: inline-block;
        width: 1.6rem;
        height: calc(1.6rem - 4px);
        background-color: #00ee4d;
        border: 3px solid #00ee4d;
        border-radius: 50%;
        color: #000;
        margin-right: 0.5rem;
        position: relative;
        top: -2px;
        padding-top: 4px;
      }

      label {
        padding-left: 0.5rem;

      }

  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CircleLetterComponent {

  @Input()
  text = "1";

}

