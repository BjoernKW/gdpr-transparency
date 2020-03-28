import { Injectable } from '@angular/core';
import Dexie from "dexie";
import { DexieService } from "./dexie.service";
import { Measure } from "./model/measure";

@Injectable({
  providedIn: 'root'
})
export class MeasureService {

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
    return this.table.add(data);
  }

  update(id: number, data) {
    return this.table.update(id, data);
  }

  remove(id: number) {
    return this.table.delete(id);
  }
}
