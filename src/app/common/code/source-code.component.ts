import { ChangeDetectionStrategy, Component, Input } from "@angular/core";


@Component({
  selector: "source-code",
  templateUrl: "./source-code.component.html",
  styleUrls: ["./source-code.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SourceCodeComponent {

  @Input() text='';
  @Input() language='language-typescript';

}
