import {MyActions} from "../templates/my-table/config/MyActions";
import {MyOrder} from "../templates/my-table/config/MyOrder";
import {MySearch} from "../templates/my-table/config/MySearch";
import {MyPagination} from "../templates/my-table/config/MyPagination";
import {MyHeaders} from "../templates/my-table/config/MyHeaders";
import {MyTableConfig} from "../templates/my-table/config/MyTableConfig";




//Actions
let actionButtonsR: MyActions[] = [{text: 'Edit rent', buttonTop: false, customClass: 'btn btn-outline-secondary princButton'},
  {text: 'Delete rent', buttonTop: false, customClass: 'btn btn-outline-secondary princButton'},
  {text: 'Add rent', buttonTop: true, customClass: 'btn btn-outline-secondary princButton'}]
let actionButtonsU: MyActions[] = [{text: 'Edit user', buttonTop: false, customClass: 'btn btn-outline-secondary princButton'},
  {text: 'Delete user', buttonTop: false, customClass: 'btn btn-outline-secondary princButton'},
  {text: 'Add user', buttonTop: true, customClass: 'btn btn-outline-secondary princButton'}]
let actionButtonsV: MyActions[] = [{text: 'Edit vehicle', buttonTop: false, customClass: 'btn btn-outline-secondary princButton'},
  {text: 'Delete vehicle', buttonTop: false, customClass: 'btn btn-outline-secondary princButton'},
  {text: 'Add vehicle', buttonTop: true, customClass: 'btn btn-outline-secondary princButton'}]
let order: MyOrder = {defaultColumn: "id", orderType: "asc"}
//Searchs
let searchR: MySearch = {columns: ["vehicleId", "userId", "id"]};
let searchU: MySearch = {columns: ["id", "name", "surname"]};
let searchV: MySearch = {columns: ["carBrand", "model", "type"]};
//Paginations
let pagination: MyPagination = {itemPerPage: 3, itemPerPageOptions: [3, 6, 9]};
//Headers
let headerR: MyHeaders[] = [{key: "id", label: "Id"}, {key: "userId", label: "User id"},
  {key: "vehicleId", label: "Veihicle id"}, {key: "stardDate", label: "Start date"},
  {key: "endDate", label: "End date"}, {key: "isApproved", label: "Approved"}];

let headerU: MyHeaders[] = [{key: "id", label: "Id"}, {key: "name", label: "Name"}, {key: "surname", label: "Surname"},
  {key: "password", label: "Password"}, {key: "birthday", label: "Birthday"}];

let headerV: MyHeaders[] = [{key: "id", label: "Id"}, {key: "carBrand", label: "Car brand"}, {
  key: "model",
  label: "Model"
},
  {key: "registrationYear", label: "Year of registration"}, {key: "type", label: "Type"}];

//Configs
export const configurazioneR: MyTableConfig = {
  headers: headerR, order: order, search: searchR, pagination: pagination,
  actions: actionButtonsR
}
export const configurazioneU: MyTableConfig = {
  headers: headerU, order: order, search: searchU, pagination: pagination,
  actions: actionButtonsU
}

export const configurazioneV: MyTableConfig = {
  headers: headerV, order: order, search: searchV, pagination: pagination,
  actions: actionButtonsV
}

