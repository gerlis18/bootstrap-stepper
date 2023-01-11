import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbNav, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  active = 1;
  disabled = true;
  form!: FormGroup;
  @ViewChild(NgbNav) stepper!: NgbNav;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      group1: this.formBuilder.group({
        username: [null, [Validators.required]],
        email: [null, [Validators.required]],
        name: [null]
      }),
      group2: this.formBuilder.group({
        username: [null, [Validators.required]],
        email: [null],
      }),
    })
  }

  onNavChange(changeEvent: NgbNavChangeEvent) {
    this.active = changeEvent.activeId;
    if (changeEvent.nextId === 3) {
      changeEvent.preventDefault();
    }
  }

  getStep(stepName: string): FormGroup {
    return this.form.get(stepName) as FormGroup;
  }

  getStepTest(): FormGroup {
    return this.form.get(`group${this.active}`) as FormGroup;
  }

  nextStep() {
    this.stepper.select(this.active + 1);
  }

  previoisStep() {
    this.stepper.select(this.active - 1);
  }

  toggleDisabled() {
    this.disabled = !this.disabled;
    if (this.disabled) {
      this.active = 1;
    }
  }

  next() {
    this.active = 2;
  }
}
