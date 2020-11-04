export interface IValidator {
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  max?: number;
  min?: number;
  pattern?: string;
  email?: boolean;
}
