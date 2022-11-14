import { ITableHeader } from '../../../projects/formbuilder/src/public-api';

export interface IConsultantContact {
  firstname: string;
  email: string;
  company: string;
  availabilty: string;
  availabiltyhours: string;
  treatment: string;
  smallmolecule: string;
  smallmoleculedev: string;
  biologic: string;
  biologicdev: string;
  oligo: string;
  oligodev: string;
  celltherapiedev: string;
  genetherapie: string;
  genetherapiedev: string;
  administrationroute: string;
  toxicology: string;
  toxicqualification: string;
  pathology: string;
  adme: string;
  pharmacology: string;
  devplans: string;
  experience: string;
  phases: string;
  areas: string;
  protocoldev: string;
  jurisdiction: string;
  operations: string;
  submissionexperience: string;
  regulatorystrat: string;
  regulatorystratpathway: string;
  safety: string;
  network: string;
  networkeu: string;
  networkasia: string;
  bumgmt: string;
  budev: string;
  commercestrat: string;
  id?: string;
  consultantid?: string;
}

export interface IConsultantContactForm {
  contact_personal_firstname: string;
  contact_personal_email: string;
  contact_personal_company: string;
  contact_application_availabilty: string;
  contact_application_availablehours: string;
  contact_application_treatment: string;
  contact_application_smallmolecule: string;
  contact_application_smallmoleculedev: string;
  contact_application_biologic: string;
  contact_application_biologicdev: string;
  contact_application_oligo: string;
  contact_application_oligodev: string;
  contact_application_celltherapiedev: string;
  contact_application_genetherapie: string;
  contact_application_genetherapiedev: string;
  contact_application_administrationroute: string;
  contact_application_toxicology: string;
  contact_application_toxicqualification: string;
  contact_application_pathology: string;
  contact_application_adme: string;
  contact_application_pharmacology: string;
  contact_application_devplans: string;
  contact_application_experience: string;
  contact_application_phases: string;
  contact_application_areas: string;
  contact_application_protocoldev: string;
  contact_application_jurisdiction: string;
  contact_application_operations: string;
  contact_application_submissionexperience: string;
  contact_application_regulatorystrat: string;
  contact_application_regulatorystratpathway: string;
  contact_application_safety: string;
  contact_application_network: string;
  contact_application_networkeu: string;
  contact_application_networkasia: string;
  contact_application_bumgmt: string;
  contact_application_budev: string;
  contact_application_commercestrat: string;
  contact_personal_id?: string;
  contact_personal_consultantid?: string;
}

export const ConsultantTable: ITableHeader[] = [
  {
    collumnName: "contact_personal_consultantid",
    collumnKey: "contact_personal_consultantid#label"
  },
  {
    collumnName: "contact_personal_firstname",
    collumnKey: "contact_personal_firstname#label"
  },
  {
    collumnName: "contact_personal_email",
    collumnKey: "contact_personal_email#label"
  },
  {
    collumnName: "contact_personal_company",
    collumnKey: "contact_personal_company#label"
  },
  {
    collumnName: "contact_application_availabilty",
    collumnKey: "contact_application_availabilty#label"
  },
  {
    collumnName: "contact_application_treatment",
    collumnKey: "contact_application_treatment#label"
  }
];
