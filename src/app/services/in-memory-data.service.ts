import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import {User} from "../models/user";

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users = [
      { id:2,  username: 'a', name: 'Oscar', surname: 'Paro', password: 'a', birthday: '', role: 'customer' },
      { id:3,  username: 'b', name: 'Ugo', surname: 'Losone', password: 'b', birthday: '', role: 'customer' },
      { id:4,  username: 'c', name: 'Rita', surname: 'Ardata', password: 'c', birthday: '', role: 'customer' },
      { id:5,  username: 's', name: 'Harry', surname: 'Tardato', password: 's', birthday: '', role: 'superuser' },
      { id:6,  username: 'd', name: 'Lina', surname: 'Maya', password: 'd', birthday: '', role: 'customer' },
      { id:7,  username: 'e', name: 'Luca', surname: 'Pezzolo', password: 'e', birthday: '', role: 'customer' },
    ];

    const rents = [
      {id:1, userId:1, vehicleId: 1, startDate: '', endDate: '', isApproved: false},
      {id:2, userId:1, vehicleId: 1, startDate: '', endDate: '', isApproved: false},
    ];

    const vehicles = [
      {id:1, carBrand:'Pegassi', model:'Zentorno', registrationYear:1999,type:'Supercar', rents:undefined }
    ]
    return { users, rents, vehicles };


  }



}
