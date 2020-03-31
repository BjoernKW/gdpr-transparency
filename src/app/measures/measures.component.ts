import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MeasureService } from "../measure.service";
import { ConfirmationService, MessageService } from "primeng/api";

import { faCheck, faTimes, faTrash, faUndo } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from "@ngx-translate/core";
import { Subscription } from "rxjs";
import { Measure } from "../model/measure";

import * as equal from 'fast-deep-equal';

@Component({
  selector: 'app-measures',
  templateUrl: './measures.component.html',
  styleUrls: ['./measures.component.scss']
})
export class MeasuresComponent implements OnInit, OnDestroy {

  form: FormGroup;

  measures: Measure[];
  selectedMeasure: Measure;
  changed = false;
  columns: { field: string, header: string }[];
  loading = false;

  faTrash = faTrash;
  faCheck = faCheck;
  faTimes = faTimes;
  faUndo = faUndo;

  private _measureSubscription: Subscription;
  private _formSubscription: Subscription;

  constructor(
    private _formBuilder: FormBuilder,
    private _measureService: MeasureService,
    private _confirmationService: ConfirmationService,
    private _translateService: TranslateService,
    private _messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      category: ['', Validators.required],
      name: ['', Validators.required],
      value: [false]
    });
    this._formSubscription = this.form.valueChanges.subscribe(value => {
      this.changed = !equal(value, this.selectedMeasure);
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
    if (this._formSubscription) {
      this._formSubscription.unsubscribe();
    }
  }

  save(): void {
    if (this.selectedMeasure) {
      this._measureService
        .update(this.selectedMeasure.id, this.form.value)
        .then(() => {
          this._translateService.get(
            [
              'operationSuccessful',
              'entrySaved'
            ]).subscribe(translations => {
              this._messageService.add({
                severity: 'success',
                summary: translations['operationSuccessful'],
                detail: translations['entrySaved']
              });
            }
          );

          this.loadList();
        });
    } else {
      this._measureService
        .add(this.form.value)
        .then(() => {
          this._translateService.get(
            [
              'operationSuccessful',
              'entrySaved'
            ]).subscribe(translations => {
              this._messageService.add({
                severity: 'success',
                summary: translations['operationSuccessful'],
                detail: translations['entrySaved']
              });
            }
          );

          this.loadList()
        });
    }

    this.changed = false;
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
            .then(() => {
              this._translateService.get(
                [
                  'operationSuccessful',
                  'entryDeleted'
                ]).subscribe(translations => {
                  this._messageService.add({
                    severity: 'error',
                    summary: translations['operationSuccessful'],
                    detail: translations['entryDeleted']
                  });
                }
              );

              this.loadList();
            });
        },
        reject: () => {
          this._confirmationService.close();
        }
      })
    );
  }

  onRowSelect() {
    this._measureService.get(this.selectedMeasure.id).then(() => {
      let measureID = this.selectedMeasure.id;
      delete this.selectedMeasure.id;

      this.form.setValue(this.selectedMeasure);

      this.selectedMeasure['id'] = measureID;
    });
  }

  onRowUnselect() {
    this.selectedMeasure = null;
    this.form.reset();
  }

  reset() {
    this.selectedMeasure = null;
  }

  discard() {
    let measureID = this.selectedMeasure.id;
    delete this.selectedMeasure.id;

    this.form.setValue(this.selectedMeasure);

    this.selectedMeasure['id'] = measureID;
  }
}
