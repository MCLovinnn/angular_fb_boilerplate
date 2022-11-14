import { ITableHeader } from '../../../projects/formbuilder/src/public-api';

export interface ICustomerContact {
    firstname: string;
    position: string;
    email: string;
    company?: string;
    website?: string;
    linkedIn?: string;
    ownership?: string;
    funding?: string;
    employees?: string;
    country?:string;
    state?:string;
    city?:string;
    api?: string;
    description?: string;
    productname?: string;
    treatment?: string;
    controlledsubstance?: string;
    dosage?: string;
    administrationroute?: string;
    administrationrouteOther?: string;
    indication?: string;
    species?: string;
    speciesOther?: string;
    regulatoryinteraction?: string;
    id?: string;
    customerid?: string;
  }

  export interface ICustomerContactForm {
    contact_personal_firstname: string;
    contact_personal_position: string;
    contact_personal_email: string;
    contact_personal_company: string;
    contact_personal_website: string;
    contact_personal_linkedIn: string;
    contact_personal_ownership: string;
    contact_personal_funding: string;
    contact_personal_employees: string;
    contact_personal_country: string;
    contact_personal_state: string;
    contact_personal_city: string;
    contact_development_api: string;
    contact_development_description: string;
    contact_development_productname: string;
    contact_development_treatment: string;
    contact_development_controlledsubstance: string;
    contact_development_dosage: string;
    contact_development_administrationroute: string;
    contact_development_administrationrouteOther: string;
    contact_development_indication: string;
    contact_development_species: string;
    contact_development_speciesOther: string;
    contact_development_regulatoryinteraction: string;
    contact_personal_id?: string;
    contact_personal_customerid?: string;
  }

  export const CustomerTable: ITableHeader[] = [
    {
      collumnName: 'contact_personal_customerid',
      collumnKey: 'contact_personal_customerid#label'
    },
    {
      collumnName: 'contact_personal_firstname',
      collumnKey: 'contact_personal_firstname#label'
    },
    {
      collumnName: 'contact_personal_position',
      collumnKey: 'contact_personal_position#label'
    },
    {
      collumnName: 'contact_personal_email',
      collumnKey: 'contact_personal_email#label'
    },
    {
      collumnName: 'contact_personal_company',
      collumnKey: 'contact_personal_company#label'
    },
    {
      collumnName: 'contact_personal_ownership',
      collumnKey: 'contact_personal_ownership#label'
    },
    {
      collumnName: 'contact_personal_employees',
      collumnKey: 'contact_personal_employees#label'
    },
    {
      collumnName: 'contact_personal_country',
      collumnKey: 'contact_personal_country#label'
    },
    {
      collumnName: 'contact_personal_state',
      collumnKey: 'contact_personal_state#label'
    },
    {
      collumnName: 'contact_personal_city',
      collumnKey: 'contact_personal_city#label'
    },
    {
      collumnName: 'contact_development_description',
      collumnKey: 'contact_development_description#label'
    },
    {
      collumnName: 'contact_development_productname',
      collumnKey: 'contact_development_productname#label'
    },
    {
      collumnName: 'contact_development_treatment',
      collumnKey: 'contact_development_treatment#label'
    }
  ];
