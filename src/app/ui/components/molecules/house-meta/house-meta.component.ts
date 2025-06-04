import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-house-meta',
  templateUrl: './house-meta.component.html',
  styleUrls: ['./house-meta.component.scss']
})
export class HouseMetaComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() categories: { id: number; name: string }[] = [];
  @Input() locations:  { id: number; name: string }[] = [];

  todayIso!: string;
  maxIso!: string;

  ngOnInit() {
    const today = new Date();
    this.todayIso = today.toISOString().substring(0,10);
    const max = new Date();
    max.setMonth(max.getMonth() + 1);
    this.maxIso = max.toISOString().substring(0,10);
  }

  get idCategoryControl(): FormControl {
    return this.form.get('idCategory') as FormControl;
  }
  get idLocationControl(): FormControl {
    return this.form.get('idLocation') as FormControl;
  }
  get publishActivationDateControl(): FormControl {
    return this.form.get('publishActivationDate') as FormControl;
  }
}

