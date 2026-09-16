import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { ToolService } from '../../services/tool.service';

@Component({
  selector: 'app-tool-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './tool-form.component.html'
})
export class ToolFormComponent implements OnInit {
  toolForm: FormGroup;
  isEditMode = false;
  toolId: string | null = null;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private toolService: ToolService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.toolForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      category: ['Power Tools', Validators.required],
      price_per_day: [0, [Validators.required, Validators.min(1)]],
      security_deposit: [0, [Validators.required, Validators.min(1)]],
      address: ['', Validators.required],
      latitude: [12.971598, Validators.required], // Default for demo
      longitude: [77.594566, Validators.required]
    });
  }

  ngOnInit() {
    this.toolId = this.route.snapshot.paramMap.get('id');
    if (this.toolId) {
      this.isEditMode = true;
      this.toolService.getTool(this.toolId).subscribe({
        next: (res) => {
          this.toolForm.patchValue(res.tool);
        },
        error: (err) => alert('Error loading tool: ' + (err.error?.error || err.message))
      });
    }
  }

  onSubmit() {
    if (this.toolForm.invalid) return;
    
    this.isSubmitting = true;
    const formData = this.toolForm.value;

    if (this.isEditMode && this.toolId) {
      this.toolService.updateTool(this.toolId, formData).subscribe({
        next: () => this.router.navigate(['/owner']),
        error: (err) => {
          alert('Error updating tool: ' + (err.error?.error || err.message));
          this.isSubmitting = false;
        }
      });
    } else {
      this.toolService.createTool(formData).subscribe({
        next: () => this.router.navigate(['/owner']),
        error: (err) => {
          alert('Error creating tool: ' + (err.error?.error || err.message));
          this.isSubmitting = false;
        }
      });
    }
  }
}
