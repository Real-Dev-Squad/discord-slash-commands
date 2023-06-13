export interface commandTypes {
  name: string;
  description: string;
  type?: number;
  required?: boolean;
  options?: commandTypes[];
}
