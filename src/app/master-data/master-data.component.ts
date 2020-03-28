import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MasterDataService } from "../master-data.service";
import { MasterData } from "../model/master-data";

@Component({
  selector: 'app-master-data',
  templateUrl: './master-data.component.html',
  styleUrls: ['./master-data.component.scss']
})
export class MasterDataComponent implements OnInit {

  form: FormGroup;
  private _masterData: MasterData;

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
        if (this._masterData.id) {
          delete this._masterData.id;
        }

        this.form.setValue(this._masterData);
      }
    });
  }

  save(): void {
    this._masterDataService.add(this.form.value);
  }
}
