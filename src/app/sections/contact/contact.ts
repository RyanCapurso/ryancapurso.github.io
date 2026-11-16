import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../core/services/contact.service';
import { PortfolioStore } from '../../core/services/portfolio.store';
import { SectionTitle } from '../../shared/section-title/section-title';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, SectionTitle],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly contact = inject(ContactService);
  protected readonly profile = inject(PortfolioStore).profile;

  protected readonly submitted = signal(false);
  protected readonly sent = signal(false);

  protected readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(120)]],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(2000)]],
  });

  /** Show a field's error after the visitor left it or tried to send. */
  protected showError(field: 'name' | 'email' | 'message'): boolean {
    const control = this.form.controls[field];
    return control.invalid && (control.touched || this.submitted());
  }

  protected onSubmit(): void {
    this.submitted.set(true);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.contact.send(this.form.getRawValue());
    this.sent.set(true);
  }
}
