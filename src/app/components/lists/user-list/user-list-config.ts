export var actionButtons: any[] = [
  {text: 'Edit', buttonTop: false, customClass: 'btn btn-outline-secondary princButton', typeOfEntity: 'user'},
  {text: 'Delete', buttonTop: false, customClass: 'btn btn-outline-secondary princButton', typeOfEntity: 'user'},
  {text: 'Add', buttonTop: true, customClass: 'btn btn-outline-secondary princButton', typeOfEntity: 'user'}]

export var order: any = {defaultColumn: "id", orderType: "asc"}
export var search: any = {columns: ["id", "name", "surname"]};
export var pagination: any = {itemPerPage: 3, itemPerPageOptions: [3, 6, 9]};
export var header: any[] = [{key: "name", label: "Name"}, {key: "surname", label: "Surname"},
  {key: "birthday", label: "Birthday"}];
