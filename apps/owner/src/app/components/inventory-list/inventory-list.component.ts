import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ToolService, Tool } from "../../services/tool.service";

@Component({
  selector: "app-inventory-list",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./inventory-list.component.html",
})
export class InventoryListComponent implements OnInit {
  tools: Tool[] = [];

  constructor(
    private toolService: ToolService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.loadTools();
  }

  loadTools() {
    this.toolService.getMyListings().subscribe({
      next: (res) => {
        console.log("Fetched tools:", res.tools);
        this.tools = res.tools;
        this.cdr.detectChanges();
        console.log("Tools state updated:", this.tools.length);
      },
      error: (err) => console.error(err),
    });
  }

  toggleStatus(tool: Tool) {
    this.toolService.toggleActive(tool.id, !tool.is_active).subscribe({
      next: () => (tool.is_active = !tool.is_active),
      error: (err) => console.error(err),
    });
  }

  deleteTool(id: string) {
    if (confirm("Are you sure you want to delete this tool?")) {
      this.toolService.deleteTool(id).subscribe({
        next: () => this.loadTools(),
        error: (err) => alert(err.error?.error || "Failed to delete tool"),
      });
    }
  }
}
