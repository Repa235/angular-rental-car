import {Rent} from "./rent";

export interface Vehicle {
  id: number;
  carBrand: string;
  model: string
  registrationYear: number;
  type:string;
  rents?: Rent[];
}
