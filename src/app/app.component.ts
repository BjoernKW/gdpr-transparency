import {Component, OnDestroy, OnInit} from '@angular/core';
import {MasterData} from "./model/master-data";
import {MasterDataService} from "./master-data.service";
import {Subscription} from "rxjs";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent implements OnInit, OnDestroy {

  currentYear = new Date().getFullYear();
  masterData: MasterData | undefined | null;
  private _masterDataSubscription: Subscription | undefined;

  constructor(
    private _masterDataService: MasterDataService,
    private _translateService: TranslateService
  ) {
    this._translateService.setDefaultLang('en');
    this._translateService.use('en');
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
