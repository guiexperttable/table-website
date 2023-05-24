import { Injectable } from "@angular/core";
import { SyncDataService } from "./sync-data.service";

@Injectable({
  providedIn: "root"
})
export class SyncCssService extends SyncDataService<Array<[string, string]>> {

  constructor() {
    super('sync-css-vars');
  }

}
