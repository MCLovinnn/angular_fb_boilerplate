export interface ICustomValidation {
  event: string; // change | blur | focus
  operator: string; // < | > | >= | <= | != | ===
  fieldToCheck?: string; // key
  fieldToUpdate?: string; // key
  reset?: boolean;
  dialog?: IDialogConfig;
}

export interface IDialogConfig {
  dialog: string; // error | info | warn
  msg: string; // key
  okAction?: () => {};
  noAction?: () => {};
  onCancel?: () => {};
  onClose?: () => {};
  reset?: boolean;
}

/*
public class CustomValidation
    {
        public string Name { get; set; }
        public string Operator { get; set; }
        public object Value { get; set; } //Null - Validation von statischen Werten Age >= 18
        public ForeignFieldCheck ForeignFieldCheck { get; set; } //Null - Validation basierend auf anderen Entitäten
        public int MessageCode { get; set; }
        public string Message { get; set; }
    }

    public class ForeignFieldCheck
    {
        public string EntityType { get; set; }
        public string Name { get; set; }
    }


*/