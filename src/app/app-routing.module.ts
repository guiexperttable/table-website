import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "", loadChildren: () =>
      import("./welcome/welcome.module").then(m => m.WelcomeModule)
  },
  {
    path: "welcome", loadChildren: () =>
      import("./welcome/welcome.module").then(m => m.WelcomeModule)
  },
  {
    path: "api", loadChildren: () =>
      import("./api/api.module").then(m => m.ApiModule)
  },
  {
    path: "doc", loadChildren: () =>
      import("./documentation/documentation.module").then(m => m.DocumentationModule)
  },
  {
    path: "demo", loadChildren: () =>
      import("./demos/demos.module").then(m => m.DemosModule)
  },
  {
    path: "law", loadChildren: () =>
      import("./law/law.module").then(m => m.LawModule)
  },
  {
    path: "", loadChildren: () =>
      import("./getstarted/getstarted.module").then(m => m.GetstartedModule)
  },
  {
    path: "**", redirectTo: "welcome"
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: false,
      anchorScrolling: "enabled"
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
