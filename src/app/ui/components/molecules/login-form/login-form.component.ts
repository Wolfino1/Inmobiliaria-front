import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  @Input() form!: FormGroup;
  @Output() submitForm = new EventEmitter<void>();

  get emailControl(): FormControl {
    return this.form.get('email') as FormControl;
  }
  get passwordControl(): FormControl {
    return this.form.get('password') as FormControl;
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.form.invalid) return;
    this.submitForm.emit();
  }
}