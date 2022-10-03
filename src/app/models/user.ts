import {Rent} from "./rent";

export interface User {
  id: number;
  username: string;
  name: string;
  surname: string;
  password: string;
  birthday: string;
  role: string;
  rents?: Rent[];
}
