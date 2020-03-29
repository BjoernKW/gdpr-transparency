import { Component, OnInit } from '@angular/core';

import { faFileImport, faFileExport } from '@fortawesome/free-solid-svg-icons';
import { DexieService } from '../dexie.service';

@Component({
  selector: 'app-data-import-export',
  templateUrl: './data-import-export.component.html',
  styleUrls: ['./data-import-export.component.scss']
})
export class DataImportExportComponent implements OnInit {

  faFileImport = faFileImport;
  faFileExport = faFileExport;

  constructor(private _dexieService: DexieService) { }

  ngOnInit(): void {
  }

  exportData() {
    this._dexieService.exportDatabase().then(blob => {
      blob.text().then(value => {
        DataImportExportComponent.triggerDownload("data:application/json;charset=utf-8," + encodeURIComponent(value), "gdpr-transparency-export.json")
      });
    });
  }

  importData($event: Event) {
    const importFile = $event.target['files'][0] as File;
    if (importFile) {
      var reader = new FileReader();
      reader.readAsText(importFile, "UTF-8");
      const self = this;
      reader.onload = function (event) {
        self._dexieService.importDatabase(event.target.result as string);
      };
    }
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
