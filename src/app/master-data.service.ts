import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { DexieService } from "./dexie.service";
import { MasterData } from "./model/master-data";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MasterDataService {

  private _masterDataChanged = new BehaviorSubject<MasterData>(null);
  masterDataChanged$ = this._masterDataChanged.asObservable();

  table: Dexie.Table<MasterData, number>;

  constructor(private dexieService: DexieService) {
    this.table = this.dexieService.table('masterData');
  }

  getAll() {
    return this.table.toArray();
  }

  add(data) {
    this._masterDataChanged.next(data);

    return this.table.add(data);
  }

  update(id, data) {
    this._masterDataChanged.next(data);

    return this.table.update(id, data);
  }

  remove(id) {
    return this.table.delete(id);
  }
}
