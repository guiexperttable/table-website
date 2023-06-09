import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-web-component-logo",
  template: `
    <!-- WebComponent-->
    <svg viewBox="0 0 47.333 40.667" xmlns="http://www.w3.org/2000/svg">
      <g>
        <path
          d="M17.31 28.024l-12.055-5.857v-3.681l12.055-5.856v4.406l-7.78 3.303 7.78 3.305v4.38zM24.122 10.931h3.56l-4.567 18.805h-3.535l4.542-18.805zM30.023 23.644l7.781-3.305-7.781-3.304v-4.405l12.055 5.856v3.681l-12.055 5.856v-4.379z" />
      </g>
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class WebComponentLogoComponent {
}
