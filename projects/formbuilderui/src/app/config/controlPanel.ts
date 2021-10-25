import {
  IField,
  ICodeEntry
} from '../../../projects/formbuilder/src/lib/interfaces/ifield';

export interface IPageConfig {
  [key: string]: {
    [key: string]: {
      [key: string]: IField;
    };
  };
}

export let fieldConfig = {
  new: {
    name: 'home_ui_new',
    htmlType: 'text'
  }
};
export let fieldTypes: ICodeEntry[] = [
  {
    value: 'select',
    key: 'home_control_type_Opt_select',
    description: 'home_control_type_Opt_select#desc'
  },
  {
    value: 'text',
    key: 'home_control_type_Opt_text',
    description: 'home_control_type_Opt_text#desc'
  },
  {
    value: 'checkbox',
    key: 'home_control_type_Opt_checkbox',
    description: 'home_control_type_Opt_checkbox#desc'
  },
  {
    value: 'date',
    key: 'home_control_type_Opt_date',
    description: 'home_control_type_Opt_date#desc'
  }
];

export let functionType: ICodeEntry[] = [
  {
    value: 'change',
    key: 'home_control_event_Opt_change',
    description: 'home_control_event_Opt_change#desc'
  },
  {
    value: 'blur',
    key: 'home_control_event_Opt_blur',
    description: 'home_control_event_Opt_blur#desc'
  },
  {
    value: 'fokusIn',
    key: 'home_control_event_Opt_focusin',
    description: 'home_control_event_Opt_focusin#desc'
  },
  {
    value: 'fokusOut',
    key: 'home_control_event_Opt_focusout',
    description: 'home_control_event_Opt_focusout#desc'
  }
];

export let operatorType: ICodeEntry[] = [
  {
    value: '<',
    key: 'home_control_operator_Opt_smaller',
    description: 'home_control_operator_Opt_smaller#desc'
  },
  {
    value: '<=',
    key: 'home_control_operator_Opt_smallerEven',
    description: 'home_control_operator_Opt_smallerEven#desc'
  },
  {
    value: '>',
    key: 'home_control_operator_Opt_bigger',
    description: 'home_control_operator_Opt_bigger#desc'
  },
  {
    value: '>=',
    key: 'home_control_operator_Opt_biggerEven',
    description: 'home_control_operator_Opt_biggerEven#desc'
  },
  {
    value: '===',
    key: 'home_control_operator_Opt_even',
    description: 'home_control_operator_Opt_even#desc'
  },
  {
    value: '!==',
    key: 'home_control_operator_Opt_noteven',
    description: 'home_control_operator_Opt_noteven#desc'
  }
];

export let actionType: ICodeEntry[] = [
  {
    value: 'reset',
    key: 'home_control_action_Opt_reset',
    description: 'home_control_action_Opt_reset#desc'
  },
  {
    value: 'update',
    key: 'home_control_action_Opt_update',
    description: 'home_control_action_Opt_update#desc'
  },
  {
    value: 'dialog',
    key: 'home_control_action_Opt_dialog',
    description: 'home_control_action_Opt_dialog#desc'
  }
];

export let allergene: IField = {
  name: 'settings_list_allergene',
  placeholder: 'Allergen',
  validators: {
    required: true
  }
};

export let controlPanelConfig = {
  type: {
    name: 'home_control_type',
    htmlType: 'select',
    validators: {
      required: true
    },
    options: fieldTypes
  },
  hintlabel: {
    name: 'home_control_hintlabel',
    htmlType: 'text',
    validators: {
      required: false,
      maxLength: 15
    },
    updateOn: 'blur'
  },
  placeholder: {
    name: 'home_control_placeholder',
    htmlType: 'text',
    validators: {
      required: false,
      minLength: 5
    }
  },
  required: {
    name: 'home_control_required',
    htmlType: 'checkbox',
    validators: {
      required: false
    }
  },
  disabled: {
    name: 'home_control_disabled',
    htmlType: 'checkbox',
    validators: {
      required: false
    }
  },
  tooltip: {
    name: 'home_control_tooltip',
    htmlType: 'text',
    validators: {
      required: false
    },
    updateOn: 'blur'
  },
  value: {
    name: 'home_control_value',
    htmlType: 'text',
    validators: {
      required: false
    },
    updateOn: 'blur'
  },
  name: {
    name: 'home_control_name',
    htmlType: 'text',
    validators: {
      required: false,
      minLength: 2
    }
  },
  event: {
    name: 'home_control_event',
    htmlType: 'select',
    validators: {
      required: true
    },
    options: functionType
  },
  min: {
    name: 'home_control_min',
    htmlType: 'text'
  },
  max: {
    name: 'home_control_max',
    htmlType: 'text'
  },
  minLength: {
    name: 'home_control_minLength',
    htmlType: 'text'
  },
  maxLength: {
    name: 'home_control_maxLength',
    htmlType: 'text'
  },
  filedToRef: {
    name: 'home_control_filedToRef',
    htmlType: 'text'
  },
  pattern: {
    name: 'home_control_pattern',
    htmlType: 'text'
  },
  operator: {
    name: 'home_control_operator',
    htmlType: 'select',
    validators: {
      required: true
    },
    options: operatorType
  },
  action: {
    name: 'home_control_action',
    htmlType: 'select',
    validators: {
      required: true
    },
    options: actionType
  },
  reset: {
    name: 'home_control_reset',
    htmlType: 'text'
  }
};
