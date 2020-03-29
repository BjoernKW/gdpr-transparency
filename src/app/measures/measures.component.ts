import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MeasureService } from "../measure.service";
import { ConfirmationService } from "primeng/api";

import { faTrash, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-measures',
  templateUrl: './measures.component.html',
  styleUrls: ['./measures.component.scss']
})
export class MeasuresComponent implements OnInit {

  form: FormGroup;

  faTrash = faTrash;
  faCheck = faCheck;
  faTimes = faTimes;

  constructor(
    private _formBuilder: FormBuilder,
    private _measureService: MeasureService
  ) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({});
  }

  save(): void {
    this._measureService.add(this.form.value);
  }
}
