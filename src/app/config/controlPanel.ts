import { IField, ICodeEntry } from '../../../projects/formbuilder/src/lib/interfaces/ifield';

export interface IPageConfig {
  [key: string]: {
    [key: string]: {
      [key: string]: IField
    }
  }
}


export let fieldConfig = {
  test: {
    name: 'home_ui_test',
  }
}

export let functionType: ICodeEntry[] = [
  {
    value: 'change',
    key: 'Änderung(Change)',
    description: 'Funktion die ausgeführt wird, wenn sich der Wert des Feldse ändert.'
  },
  {
    value: 'blur',
    key: 'Änderung(Blur)',
    description: 'Funktion die ausgeführt wird, wenn sich der Wert des Feldse ändert.'
  },
  {
    value: 'fokusIn',
    key: 'Fokus-Rein',
    description: 'Funktion die ausgeführt wird, wenn der User in das Feld klickt.'
  },
  {
    value: 'fokusOut',
    key: 'Fokus-Raus',
    description: 'Funktion die ausgeführt wird, wenn der User aus dem Feld klickt.'
  }
];

export let operatorType: ICodeEntry[] = [
  {
    value: '<',
    key: 'Kleiner',
    description: 'Funktion die ausgeführt wird, wenn sich der Wert des Feldse ändert.'
  },
  {
    value: '<=',
    key: 'Kleiner, gleich',
    description: 'Funktion die ausgeführt wird, wenn sich der Wert des Feldse ändert.'
  },
  {
    value: '>',
    key: 'Größer',
    description: 'Funktion die ausgeführt wird, wenn sich der Wert des Feldse ändert.'
  },
  {
    value: '>=',
    key: 'Größer, gleich',
    description: 'Funktion die ausgeführt wird, wenn sich der Wert des Feldse ändert.'
  },
  {
    value: '===',
    key: 'Gleich',
    description: 'Funktion die ausgeführt wird, wenn der User aus dem Feld klickt.'
  },
  {
    value: '!==',
    key: 'Ungleich',
    description: 'Funktion die ausgeführt wird, wenn der User in das Feld klickt.'
  }
];

export let actionType: ICodeEntry[] = [
  {
    value: 'reset',
    key: 'Aktuelles Feld zurücksetzten',
    description: 'Funktion die ausgeführt wird, wenn sich der Wert des Feldse ändert.'
  },
  {
    value: 'update',
    key: 'Zu prüfendes Feld updaten',
    description: 'Funktion die ausgeführt wird, wenn sich der Wert des Feldse ändert.'
  },
  {
    value: 'dialog',
    key: 'Einen Dialog anzeigen',
    description: 'Funktion die ausgeführt wird, wenn der User in das Feld klickt.'
  }
];

export let allergene: IField = {
  name: 'settings_list_allergene',
  placeholder: 'Allergen',
  iconAction: '',
  validators: {
    required: true
  }
}

export let controlPanelConfig = {
  type: {
    name: 'home_control_type',
    htmlType: 'select',
    validators: {
      required: true
    },
    options: functionType
  },
  Hintlabel: {
    name: 'home_control_hintlabel',
    htmlType: 'text',
    validators: {
      required: false,
      maxLength: 15
    }
  },
  placeholder:
  {
    name: 'home_control_placeholder',
    htmlType: 'text',
    validators: {
      required: false,
      minLength: 5
    }
  },
  required:
  {
    name: 'home_control_required',
    htmlType: 'checkbox',
    validators: {
      required: false
    }
  },
  disabled:
  {
    name: 'home_control_disabled',
    htmlType: 'checkbox',
    validators: {
      required: false
    }
  },
  tooltip:
  {
    name: 'home_control_tooltip',
    htmlType: 'text',
    validators: {
      required: false
    }
  },
  value:
  {
    name: 'home_control_value',
    htmlType: 'text',
    validators: {
      required: false
    }
  },
  name:
  {
    name: 'home_control_name',
    htmlType: 'text',
    validators: {
      required: false,
      minLength: 2
    }
  },
  event:
  {
    name: 'home_control_event',
    htmlType: 'select',
    validators: {
      required: true
    },
    options: operatorType
  },
  min :
  {
    name: 'home_control_min',
    htmlType: 'number',
  },
  max :
  {
    name: 'home_control_max',
    htmlType: 'number',
  },
  minLength: {
    name: 'home_control_minLength',
    htmlType: 'number'
  },
  maxLength: {
    name: 'home_control_maxLength',
    htmlType: 'number'
  },
  filedToRef: {
    name: 'home_control_filedToRef',
    htmlType: 'number'
  },
  pattern: {
    name: 'home_control_pattern',
    htmlType: 'number'
  },
  operator: {
    name: 'home_control_operator',
    htmlType: 'number'
  },
  action: {
    name: 'home_control_action',
    htmlType: 'number'
  },
  reset: {
    name: 'home_control_reset',
    htmlType: 'number'
  }
};
