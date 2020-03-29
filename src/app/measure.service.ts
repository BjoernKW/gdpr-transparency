import { Injectable } from '@angular/core';
import Dexie from "dexie";
import { DexieService } from "./dexie.service";
import { Measure } from "./model/measure";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MeasureService {

  private _measureChanged = new BehaviorSubject<Measure>(null);
  measureChanged$ = this._measureChanged.asObservable();

  table: Dexie.Table<Measure, number>;

  constructor(private dexieService: DexieService) {
    this.table = this.dexieService.table('measures');
  }

  get(id: number) {
    return this.table.get(id);
  }

  getAll() {
    return this.table.toArray();
  }

  add(data) {
    this._measureChanged.next(data);

    return this.table.add(data);
  }

  update(id: number, data) {
    this._measureChanged.next(data);

    return this.table.update(id, data);
  }

  remove(id: number) {
    this._measureChanged.next(null);

    return this.table.delete(id);
  }

  clear() {
    this._measureChanged.next(null);

    return this.table.clear();
  }
}
