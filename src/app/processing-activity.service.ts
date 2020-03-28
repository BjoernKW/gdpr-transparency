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

  get(id: number) {
    return this.table.get(id);
  }

  getAll() {
    return this.table.toArray();
  }

  add(data) {
    return this.table.add(data);
  }

  update(id: number, data) {
    return this.table.update(id, data);
  }

  remove(id: number) {
    return this.table.delete(id);
  }
}
