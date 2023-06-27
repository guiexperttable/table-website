import { ChangeDetectionStrategy, Component } from "@angular/core";
import { GeTypewriterModule } from "../../common/ge-typewriter/ge-typewriter.module";
import { NgIf } from "@angular/common";


@Component({
  selector: "[appSectionHeroCube]",
  templateUrl: "./welcome-section-hero-cube.component.html",
  styleUrls: ["./welcome-section-hero-cube.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    GeTypewriterModule,
    NgIf
  ],
  standalone: true
})
export class WelcomeSectionHeroCubeComponent {
}
