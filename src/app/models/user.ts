import {Rent} from "./rent";
import * as moment from "moment";

export interface User {
  id: number;
  username?: string;
  name?: string;
  surname?: string;
  password?: string;
  birthday?: moment.Moment;
  role?: string;
  rents?: Rent[];
}
