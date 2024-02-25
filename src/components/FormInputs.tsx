export interface Input {
    id: number;
    name: string;
    type: string;
    text_type?:string;
    value?:string;
    placeholder?: string;
    errorMessage?: string;
    label: string;
    pattern?: RegExp;
    required?: boolean;
    maxlen?:number;
    minlen?:number;
    size?:"small" | "medium" | "large";
    /* button_size?:string;
    button_type?:"solid"|"outline",
    button_img?:string; */
  }