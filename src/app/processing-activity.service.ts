import { Injectable } from '@angular/core';
import Dexie from "dexie";
import { DexieService } from "./dexie.service";
import { ProcessingActivity } from "./model/processing-activity";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProcessingActivityService {

  private _processingActivityChanged = new BehaviorSubject<ProcessingActivity | null>(null);
  processingActivityChanged$ = this._processingActivityChanged.asObservable();

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

  add(data: any) {
    this._processingActivityChanged.next(data);

    return this.table.add(data);
  }

  update(id: number, data: any) {
    this._processingActivityChanged.next(data);

    return this.table.update(id, data);
  }

  remove(id: number) {
    this._processingActivityChanged.next(null);

    return this.table.delete(id);
  }

  clear() {
    this._processingActivityChanged.next(null);

    return this.table.clear();
  }
}
