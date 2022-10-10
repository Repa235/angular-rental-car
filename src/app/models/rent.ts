import * as moment from "moment/moment";

export interface Rent {
  id: number;
  userId: number;
  vehicleId: number;
  startDate: moment.Moment;
  endDate: moment.Moment;
  isApproved: boolean;
}
