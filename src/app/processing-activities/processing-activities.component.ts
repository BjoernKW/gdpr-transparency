import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProcessingActivityService } from "../processing-activity.service";
import { ProcessingActivity } from "../model/processing-activity";
import { TranslateService } from "@ngx-translate/core";
import { ConfirmationService } from "primeng/api";

import { faTrash, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-processing-activities',
  templateUrl: './processing-activities.component.html',
  styleUrls: ['./processing-activities.component.scss']
})
export class ProcessingActivitiesComponent implements OnInit {

  form: FormGroup;

  processingActivities: ProcessingActivity[];
  selectedProcessingActivity: ProcessingActivity;
  columns: { field: string, header: string }[];
  loading = false;

  faTrash = faTrash;
  faCheck = faCheck;
  faTimes = faTimes;

  constructor(
    private _formBuilder: FormBuilder,
    private _processingActivityService: ProcessingActivityService,
    private _confirmationService: ConfirmationService,
    private _translateService: TranslateService
  ) { }

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
        { field: 'description', header: translations['description'] },
        { field: 'personResponsible', header: translations['personResponsible'] },
        { field: 'purpose', header: translations['purpose'] },
        { field: 'affectedGroups', header: translations['affectedGroups'] },
        { field: 'recipients', header: translations['recipients'] },
        { field: 'thirdCountryDataTransfers', header: translations['thirdCountryDataTransfers'] },
        { field: 'dataDeletionPeriod', header: translations['dataDeletionPeriod'] },
        { field: 'resourcesUsed', header: translations['resourcesUsed'] }
      ];
    });

    this.loading = true;
  }

  save(): void {
    if (this.selectedProcessingActivity) {
      this._processingActivityService
        .update(this.selectedProcessingActivity.id, this.form.value)
        .then(() => this.loadList());
    } else {
      this._processingActivityService
        .add(this.form.value)
        .then(() => this.loadList());
    }
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
            .then(() => this.loadList());
        },
        reject: () => {
          this._confirmationService.close();
        }
      })
    )
  }

  onRowSelect() {
    this._processingActivityService.get(this.selectedProcessingActivity.id).then(processActivity => {
      let processingActivityID = this.selectedProcessingActivity.id;
      delete this.selectedProcessingActivity.id;

      this.form.setValue(this.selectedProcessingActivity);

      this.selectedProcessingActivity['id'] = processingActivityID;
    });
  }

  reset() {
    this.selectedProcessingActivity = null;
  }
}
