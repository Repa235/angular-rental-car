import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import {User} from "../models/user";

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users = [
      { id:'1',  username: 's', name: 'Tito', surname: 'Lare', password: 's', birthday: '', role: 'superuser' },
      { id:'2',  username: 'a', name: 'Oscar', surname: 'Paro', password: 'a', birthday: '', role: 'customer' },
    ];
    return {users};
  }

  genId(heroes: User[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(user => user.id)) + 1 : 11;
  }

}
