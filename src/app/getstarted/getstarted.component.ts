import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-get-started",
  templateUrl: "./getstarted.component.html",
  styleUrls: ["./getstarted.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GetstartedComponent {
  logoSize = 80;
}
