import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "[appSectionFeatures]",
  templateUrl: "./welcome-section-features.component.html",
  styleUrls: ["../feature-box.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class WelcomeSectionFeaturesComponent {
}
