// interface for menu list option of multiselect drop down 
export interface Option {
    readonly value?: string;
    readonly label?: string;
    readonly color?: string;
    readonly isFixed?: boolean;// for compulsory option
    readonly isDisabled?: boolean;// shown in option but can't be selected
  }