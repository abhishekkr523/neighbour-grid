import { Component } from "@angular/core";
import { RouterModule, RouterOutlet } from "@angular/router";
import { NxWelcome } from "./nx-welcome";

@Component({
  imports: [RouterModule, RouterOutlet],
  selector: "app-root",
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
})
export class App {
  protected title = "web";
}
