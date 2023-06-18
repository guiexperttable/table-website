import { ChangeDetectionStrategy, Component } from "@angular/core";
import { NgIf } from "@angular/common";
import { GeTypewriterModule } from "../../common/ge-typewriter/ge-typewriter.module";
import { MatButtonModule } from "@angular/material/button";


@Component({
  selector: "[appSectionHero]",
  templateUrl: "./welcome-section-hero.component.html",
  styleUrls: ["./welcome-section-hero.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    GeTypewriterModule,
    MatButtonModule,
    NgIf
  ],
  standalone: true
})
export class WelcomeSectionHeroComponent {

  public typewriter = true;

  scrollTo(sel: string) {
    document.querySelector(`${sel}`)?.scrollIntoView({ behavior: "smooth" });
  }
}
