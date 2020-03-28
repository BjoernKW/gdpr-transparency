import { Injectable } from '@angular/core';
import Dexie from "dexie";
import { DexieService } from "./dexie.service";
import { ProcessingActivity } from "./model/processing-activity";

@Injectable({
  providedIn: 'root'
})
export class ProcessingActivityService {

  table: Dexie.Table<ProcessingActivity, number>;

  constructor(private dexieService: DexieService) {
    this.table = this.dexieService.table('processingActivities');
  }

  getAll() {
    return this.table.toArray();
  }

  add(data) {
    return this.table.add(data);
  }

  update(id, data) {
    return this.table.update(id, data);
  }

  remove(id) {
    return this.table.delete(id);
  }
}
