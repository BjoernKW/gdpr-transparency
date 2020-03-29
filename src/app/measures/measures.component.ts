import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MeasureService } from "../measure.service";
import { ConfirmationService } from "primeng/api";

import { faCheck, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from "@ngx-translate/core";
import { Subscription } from "rxjs";
import { Measure } from "../model/measure";

@Component({
  selector: 'app-measures',
  templateUrl: './measures.component.html',
  styleUrls: ['./measures.component.scss']
})
export class MeasuresComponent implements OnInit, OnDestroy {

  form: FormGroup;

  measures: Measure[];
  selectedMeasure: Measure;
  columns: { field: string, header: string }[];
  loading = false;

  faTrash = faTrash;
  faCheck = faCheck;
  faTimes = faTimes;

  private _measureSubscription: Subscription;

  constructor(
    private _formBuilder: FormBuilder,
    private _measureService: MeasureService,
    private _confirmationService: ConfirmationService,
    private _translateService: TranslateService
  ) {
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      category: ['', Validators.required],
      name: ['', Validators.required],
      value: [false]
    });

    this._translateService.get(
      [
        'category',
        'name',
        'value'
      ]
    ).subscribe(translations => {
      this.columns = [
        {field: 'category', header: translations['category']},
        {field: 'name', header: translations['name']},
        {field: 'value', header: translations['value']}
      ];
    });

    this.loading = true;

    this._measureSubscription =
      this._measureService.measureChanged$.subscribe(() => this.loadList());
  }

  ngOnDestroy(): void {
    if (this._measureSubscription) {
      this._measureSubscription.unsubscribe();
    }
  }

  save(): void {
    if (this.selectedMeasure) {
      this._measureService
        .update(this.selectedMeasure.id, this.form.value)
        .then(() => this.loadList());
    } else {
      this._measureService
        .add(this.form.value)
        .then(() => this.loadList());
    }
  }

  loadList() {
    this.loading = true;
    this._measureService.getAll().then(measures => {
      this.measures = measures;
      this.loading = false;
    });
  }

  delete(id: number) {
    this._translateService.get('areYouSure').subscribe(message =>
      this._confirmationService.confirm({
        message: message,
        accept: () => {
          this._measureService
            .remove(id)
            .then(() => this.loadList());
        },
        reject: () => {
          this._confirmationService.close();
        }
      })
    );
  }

  onRowSelect() {
    this._measureService.get(this.selectedMeasure.id).then(measure => {
      let processingActivityID = this.selectedMeasure.id;
      delete this.selectedMeasure.id;

      this.form.setValue(this.selectedMeasure);

      this.selectedMeasure['id'] = processingActivityID;
    });
  }

  reset() {
    this.selectedMeasure = null;
  }
}
