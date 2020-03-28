import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProcessingActivityService } from "../processing-activity.service";

@Component({
  selector: 'app-processing-activities',
  templateUrl: './processing-activities.component.html',
  styleUrls: ['./processing-activities.component.scss']
})
export class ProcessingActivitiesComponent implements OnInit {

  form: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _processingActivityService: ProcessingActivityService
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
    })
  }

  save(): void {
    this._processingActivityService.add(this.form.value);
  }
}
