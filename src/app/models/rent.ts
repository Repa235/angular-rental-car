import * as moment from "moment/moment";
import {Vehicle} from "./vehicle";
import {User} from "./user";

export interface Rent {
  id: number;
  userDto: User;
  vehicleDto: Vehicle;
  startDate: moment.Moment;
  endDate: moment.Moment;
  isApproved: boolean;
  fullName?: string;
  fullNVehicle?:string;
}
