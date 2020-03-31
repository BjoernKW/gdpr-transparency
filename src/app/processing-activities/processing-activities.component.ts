import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProcessingActivityService } from "../processing-activity.service";
import { ProcessingActivity } from "../model/processing-activity";
import { TranslateService } from "@ngx-translate/core";
import { ConfirmationService, MessageService } from "primeng/api";

import { faCheck, faTimes, faTrash, faUndo } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from "rxjs";

import * as equal from 'fast-deep-equal';

@Component({
  selector: 'app-processing-activities',
  templateUrl: './processing-activities.component.html',
  styleUrls: ['./processing-activities.component.scss']
})
export class ProcessingActivitiesComponent implements OnInit, OnDestroy {

  form: FormGroup;

  processingActivities: ProcessingActivity[];
  selectedProcessingActivity: ProcessingActivity;
  changed = false;
  columns: { field: string, header: string }[];
  loading = false;

  faTrash = faTrash;
  faCheck = faCheck;
  faTimes = faTimes;
  faUndo = faUndo;

  private _processingActivitySubscription: Subscription;
  private _formSubscription: Subscription;

  constructor(
    private _formBuilder: FormBuilder,
    private _processingActivityService: ProcessingActivityService,
    private _confirmationService: ConfirmationService,
    private _translateService: TranslateService,
    private _messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      description: ['', Validators.required],
      personResponsible: ['', Validators.required],
      purpose: ['', Validators.required],
      affectedGroups: ['', Validators.required],
      recipients: ['', Validators.required],
      thirdCountryDataTransfers: ['', Validators.required],
      dataDeletionPeriod: ['', Validators.required],
      resourcesUsed: ['']
    });
    this._formSubscription = this.form.valueChanges.subscribe(value => {
      this.changed = !equal(value, this.selectedProcessingActivity);
    });

    this._translateService.get(
      [
        'description',
        'personResponsible',
        'purpose',
        'affectedGroups',
        'recipients',
        'thirdCountryDataTransfers',
        'dataDeletionPeriod',
        'resourcesUsed'
      ]
    ).subscribe(translations => {
      this.columns = [
        {field: 'description', header: translations['description']},
        {field: 'personResponsible', header: translations['personResponsible']},
        {field: 'purpose', header: translations['purpose']},
        {field: 'affectedGroups', header: translations['affectedGroups']},
        {field: 'recipients', header: translations['recipients']},
        {field: 'thirdCountryDataTransfers', header: translations['thirdCountryDataTransfers']},
        {field: 'dataDeletionPeriod', header: translations['dataDeletionPeriod']},
        {field: 'resourcesUsed', header: translations['resourcesUsed']}
      ];
    });

    this.loading = true;

    this._processingActivitySubscription =
      this._processingActivityService.processingActivityChanged$.subscribe(() => this.loadList());
  }

  ngOnDestroy(): void {
    if (this._processingActivitySubscription) {
      this._processingActivitySubscription.unsubscribe();
    }
    if (this._formSubscription) {
      this._formSubscription.unsubscribe();
    }
  }

  save(): void {
    if (this.selectedProcessingActivity) {
      this._processingActivityService
        .update(this.selectedProcessingActivity.id, this.form.value)
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
      this._processingActivityService
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

          this.loadList();
        });
    }

    this.changed = false;
  }

  loadList() {
    this.loading = true;
    this._processingActivityService.getAll().then(processingActivities => {
      this.processingActivities = processingActivities;
      this.loading = false;
    });
  }

  delete(id: number) {
    this._translateService.get('areYouSure').subscribe(message =>
      this._confirmationService.confirm({
        message: message,
        accept: () => {
          this._processingActivityService
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
    this._processingActivityService.get(this.selectedProcessingActivity.id).then(() => {
      let processingActivityID = this.selectedProcessingActivity.id;
      delete this.selectedProcessingActivity.id;

      this.form.setValue(this.selectedProcessingActivity);

      this.selectedProcessingActivity['id'] = processingActivityID;
    });
  }

  reset() {
    this.selectedProcessingActivity = null;
  }

  discard() {
    let processingActivityID = this.selectedProcessingActivity.id;
    delete this.selectedProcessingActivity.id;

    this.form.setValue(this.selectedProcessingActivity);

    this.selectedProcessingActivity['id'] = processingActivityID;
  }

  onRowUnselect() {
    this.selectedProcessingActivity = null;
    this.form.reset();
  }
}
