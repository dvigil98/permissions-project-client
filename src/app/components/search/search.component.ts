import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  @Input() searchBy: any[] = [];
  @Output() searchEvent = new EventEmitter<string>();
  @Output() clearEvent = new EventEmitter<string>();

  form!: FormGroup;
  submitted: boolean = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      critery: ['', Validators.required],
      value: ['', Validators.required]
    });
  }

  search() {

    this.submitted = true;

    if (this.form.valid) {
      this.searchEvent.emit(this.form.value);
    } else {

      Swal.fire({
        title: '¡Oops!',
        text: 'Llene los campos requeridos',
        icon: 'error'
      });

    }
  }

  clear() {
    this.form.reset();
    this.form.get('critery')?.setValue('');
    this.submitted = false;
    this.clearEvent.emit();
  }

  //
  get requiredCritery(): boolean {
    return (this.form.get('critery')?.errors?.['required'] && this.submitted) || (this.form.get('critery')?.errors?.['required'] && this.form.get('critery')?.dirty);
  }

  get requiredValue(): boolean {
    return (this.form.get('value')?.errors?.['required'] && this.submitted) || (this.form.get('value')?.errors?.['required'] && this.form.get('value')?.dirty);
  }
}
