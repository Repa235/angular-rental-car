export var actionButtons4User: any[] = [
  {text: 'Edit', buttonTop: false, customClass: 'btn btn-outline-secondary princButton', typeOfEntity: 'rent'},
  {text: 'Delete', buttonTop: false, customClass: 'btn btn-outline-secondary princButton', typeOfEntity: 'rent'},
  {text: 'Add', buttonTop: true, customClass: 'btn btn-outline-secondary princButton', typeOfEntity: 'rent'}
]

export var actionButtons4SuperUser: any[] =  [
  {text: 'Delete', buttonTop: false, customClass: 'btn btn-outline-secondary princButton', typeOfEntity: 'rent'},
  {text: 'Approve', buttonTop: false, customClass: 'btn btn-outline-secondary princButton', typeOfEntity: 'rent'}]

export var order: any = {defaultColumn: "id", orderType: "asc"}

 export var header4User: any[] = [
  {key: "vehicle", label: "Vehicle"}, {key: "startDate", label: "Start date"},
    {key: "endDate", label: "End date"}, {key: "approved", label: "Approved"}
  ];

export var header4SuperUser: any[] = [
  {key: "fullName", label: "User"},
  {key: "vehicle", label: "Vehicle"}, {key: "startDate", label: "Start date"},
  {key: "endDate", label: "End date"}, {key: "approved", label: "Approved"}
];

export var search: any = {columns: ["startDate", "endDate", "vehicle"]};

export var pagination: any = {itemPerPage: 3, itemPerPageOptions: [3, 6, 9]};
