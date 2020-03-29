import { Component, OnInit } from '@angular/core';

import { faFileExport, faFileImport } from '@fortawesome/free-solid-svg-icons';
import { DexieService } from '../dexie.service';
import { MasterDataService } from "../master-data.service";
import { ProcessingActivityService } from "../processing-activity.service";
import { MeasureService } from "../measure.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-data-import-export',
  templateUrl: './data-import-export.component.html',
  styleUrls: ['./data-import-export.component.scss']
})
export class DataImportExportComponent implements OnInit {

  faFileImport = faFileImport;
  faFileExport = faFileExport;

  constructor(
    private _dexieService: DexieService,
    private _masterDataService: MasterDataService,
    private _processingActivityService: ProcessingActivityService,
    private _measureService: MeasureService,
    private _confirmationService: ConfirmationService,
    private _translateService: TranslateService,
    private _messageService: MessageService
  ) {
  }

  ngOnInit(): void {
  }

  exportData() {
    this._dexieService.exportDatabase().then(blob => {
      blob.text().then(value => {
        DataImportExportComponent.triggerDownload("data:application/json;charset=utf-8," + encodeURIComponent(value), "gdpr-transparency-export.json");

        this._translateService.get(
          [
            'operationSuccessful',
            'dataExported'
          ]).subscribe(translations =>
          this._messageService.add({
            severity: 'success',
            summary: translations['operationSuccessful'],
            detail: translations['dataExported']
          })
        );
      });
    });
  }

  importData($event: Event) {
    this._translateService.get(
      [
        'areYouSure',
        'operationSuccessful',
        'dataImported',
        'operationFailed',
        'dataCouldNotBeImported'
      ]).subscribe(translations =>
      this._confirmationService.confirm({
        message: translations['areYouSure'],
        accept: () => {
          const importFile = $event.target['files'][0] as File;
          if (importFile) {
            this._masterDataService.clear()
              .then(() => this._processingActivityService.clear())
              .then(() => this._measureService.clear())
              .then(() => this._dexieService.importDatabase(importFile))
              .then(() => {
                this._messageService.add({
                  severity: 'success',
                  summary: translations['operationSuccessful'],
                  detail: translations['dataImported']
                });
                setInterval(() => location.reload(), 2000);
              })
              .catch(() => this._messageService.add({
                severity: 'success',
                summary: translations['operationFailed'],
                detail: translations['dataCouldNotBeImported']
              }));
          }
        },
        reject: () => {
          this._confirmationService.close();
        }
      })
    );

  }

  private static triggerDownload(dataURL: string, filename: string) {
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(dataURL, filename);
      return;
    } else {
      const a = window.document.createElement('a');
      a.href = dataURL;
      a.download = filename;
      document.body.appendChild(a);
      a.click();  // IE: "Access is denied"; see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
      document.body.removeChild(a);
    }
  }
}
