export var actionButtons: any[] = [{
  text: 'Rent',
  buttonTop: false,
  customClass: 'btn btn-outline-secondary princButton',
  typeOfEntity: 'vehicle'
},
]

export var order = {defaultColumn: "id", orderType: "asc"}
export var search = {columns: ["carBrand", "model", "type"]};
export var pagination = {itemPerPage: 3, itemPerPageOptions: [3, 6, 9]};
export var header: any[] = [ {key: "carBrand", label: "Car brand"}, {
  key: "model",
  label: "Model"
},
  {key: "registrationYear", label: "Year of registration"}, {key: "type", label: "Type"}];

export var tableOptionsConfig = {
  headers: header, order: order, search: search, pagination: pagination, actions: actionButtons
}
