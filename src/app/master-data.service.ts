import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { DexieService } from "./dexie.service";
import { MasterData } from "./model/master-data";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MasterDataService {

  private _masterDataChanged = new BehaviorSubject<MasterData | null>(null);
  masterDataChanged$ = this._masterDataChanged.asObservable();

  table: Dexie.Table<MasterData, number>;

  constructor(private dexieService: DexieService) {
    this.table = this.dexieService.table('masterData');
  }

  get(id: number) {
    return this.table.get(id);
  }

  getAll() {
    return this.table.toArray();
  }

  add(data: any) {
    this._masterDataChanged.next(data);

    return this.table.add(data);
  }

  update(id: number, data: any) {
    this._masterDataChanged.next(data);

    return this.table.update(id, data);
  }

  remove(id: number) {
    this._masterDataChanged.next(null);

    return this.table.delete(id);
  }

  clear() {
    this._masterDataChanged.next(null);

    return this.table.clear();
  }
}
