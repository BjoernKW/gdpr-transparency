import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MasterDataService } from "../master-data.service";
import { MasterData } from "../model/master-data";

import { faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-master-data',
  templateUrl: './master-data.component.html',
  styleUrls: ['./master-data.component.scss']
})
export class MasterDataComponent implements OnInit {

  form: FormGroup;
  private _masterData: MasterData;

  faCheck = faCheck;

  constructor(
    private _formBuilder: FormBuilder,
    private _masterDataService: MasterDataService
  ) {
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      company: ['', Validators.required],
      legalRepresentative: ['', Validators.required],
      address: ['', Validators.required]
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

  save(): void {
    if (this._masterData) {
      this._masterDataService.update(this._masterData.id, this.form.value);
    } else {
      this._masterDataService.add(this.form.value);
    }
  }
}
