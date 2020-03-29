import { Injectable } from '@angular/core';

import Dexie from 'dexie';
import { exportDB, importDB } from 'dexie-export-import';

@Injectable({
  providedIn: 'root'
})
export class DexieService extends Dexie {
  constructor() {
    super('GDPRTransparency');
    this.version(1).stores({
      masterData: "++id,company,legalRepresentative",
      processingActivities: "++id,description,personResponsible,purpose,affectedGroups,recipients,thirdCountryDataTransfers,dataDeletionPeriod,resourcesUsed",
      measures: "++id,category,name,value"
    });
  }

  exportDatabase(): Promise<any> {
    return exportDB(this, { prettyJson: true });
  }

  importDatabase(data: string) {
    importDB(data);
  }
}
