import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { MeasureService } from "../measure.service";

@Component({
  selector: 'app-measures',
  templateUrl: './measures.component.html',
  styleUrls: ['./measures.component.scss']
})
export class MeasuresComponent implements OnInit {

  form: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _measureService: MeasureService
  ) { }

  ngOnInit(): void {
  }

  save(): void {
    this._measureService.add(this.form.value);
  }
}
