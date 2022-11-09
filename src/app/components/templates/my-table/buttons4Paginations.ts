import {MyActions} from "./config/MyActions";

export var buttons4Paginations: MyActions[] = [
  {
    icon: 'fa fa-arrow-left',
    text: '',
    customClass: 'btn btn-outline-secondary capsuleSx',
    buttonTop: false,
    typeOfEntity: '',
    methodToCall: 'prevpage'
  },
  {
    icon: undefined,
    text: 'First',
    customClass: 'btn btn-outline-secondary capsuleCenter',
    buttonTop: true,
    typeOfEntity: 'goToPage0'
  },
  {
    icon: undefined,
    text: '...',
    customClass: 'btn btn-outline-secondary capsuleCenter',
    buttonTop: true,
    typeOfEntity: 'goToPageSel-2'
  },
  {
    icon: undefined,
    text: '...',
    customClass: 'btn btn-outline-secondary capsuleCenter',
    buttonTop: true,
    typeOfEntity: 'goToPageSel-2'
  },

]
