import { Component, OnDestroy, OnInit } from '@angular/core';
import { MasterData } from "./model/master-data";
import { MasterDataService } from "./master-data.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  currentYear = new Date().getFullYear();
  masterData: MasterData;
  private _masterDataSubscription: Subscription;

  constructor(
    private _masterDataService: MasterDataService
  ) {
  }

  ngOnInit(): void {
    this._masterDataSubscription =
      this._masterDataService.masterDataChanged$.subscribe(masterData => this.masterData = masterData);

    this._masterDataService.getAll().then(value => {
      this.masterData = value[0];
    });
  }

  ngOnDestroy(): void {
    if (this._masterDataSubscription) {
      this._masterDataSubscription.unsubscribe();
    }
  }
}
