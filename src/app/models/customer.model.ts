import { Address } from "./address.model";

export interface Customer{
    documentNumber: string;  // Não pode ser nulo
  corporateName: string;   // Não pode ser nulo
  tradeName: string;       // Não pode ser nulo
  dateFoundation: string;  // Não pode ser nulo
  phoneNumber:string;
  email:string
  address: Address;
}