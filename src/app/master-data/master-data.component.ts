import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { MasterDataService } from "../master-data.service";
import { MasterData } from "../model/master-data";

import { faCheck, faUndo } from '@fortawesome/free-solid-svg-icons';
import { MessageService } from "primeng/api";
import { TranslateService } from "@ngx-translate/core";

import * as equal from 'fast-deep-equal';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-master-data',
  templateUrl: './master-data.component.html',
  styleUrls: ['./master-data.component.scss']
})
export class MasterDataComponent implements OnInit, OnDestroy {

  form!: UntypedFormGroup;
  private _masterData: MasterData | undefined;
  changed = false;

  faCheck = faCheck;
  faUndo = faUndo;

  private _formSubscription: Subscription | undefined;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _masterDataService: MasterDataService,
    private _translateService: TranslateService,
    private _messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      company: ['', Validators.required],
      legalRepresentative: ['', Validators.required],
      address: ['', Validators.required]
    });
    this._formSubscription = this.form.valueChanges.subscribe(value => {
      this.changed = !equal(value, this._masterData);
    });

    this._masterDataService.getAll().then(value => {
      this._masterData = value[0];
      if (this._masterData) {
        let masterDataID;
        if (this._masterData.id) {
          masterDataID = this._masterData.id;
          delete this._masterData.id;
        }

        this.form.setValue(this._masterData);

        this._masterData['id'] = masterDataID;
      }
    });
  }

  ngOnDestroy(): void {
    if (this._formSubscription) {
      this._formSubscription.unsubscribe();
    }
  }

  save(): void {
    if (this._masterData && this._masterData.id) {
      this._masterDataService.update(this._masterData.id, this.form.value);
    } else {
      this._masterDataService.add(this.form.value);
    }

    this.changed = false;

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
  }

  discard() {
    if (this._masterData) {
      let masterDataID = this._masterData.id;
      delete this._masterData.id;

      this.form.setValue(this._masterData);

      this._masterData['id'] = masterDataID;
    }
  }
}
