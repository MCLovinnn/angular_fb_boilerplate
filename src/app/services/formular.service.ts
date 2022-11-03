import { Injectable } from '@angular/core';
import {
  ICustomerContact,
  ICustomerContactForm
} from '../interfaces/icustomer';
import {
  IConsultantContact,
  IConsultantContactForm,
  ConsultantTable
} from '../interfaces/iconsultant';
import { FormService, TranslatePipe } from '../../../projects/formbuilder/src/public-api';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormularService {
  constructor(private fs: FormService, private https: HttpClient, private ts: TranslatePipe) {}

  customerToForm(customer: ICustomerContact): ICustomerContactForm {
    let item: ICustomerContactForm = {
      contact_personal_firstname: customer.firstname,
      contact_personal_position: customer.position,
      contact_personal_email: customer.email,
      contact_personal_company: customer.company ? customer.company : '',
      contact_personal_website: customer.website ? customer.website : '',
      contact_personal_linkedIn: customer.linkedIn ? customer.linkedIn : '',
      contact_personal_ownership: customer.ownership ? customer.ownership : '',
      contact_personal_funding: customer.funding ? customer.funding : '',
      contact_personal_employees: customer.employees ? customer.employees : '',
      contact_personal_country: customer.country ? customer.country : '',
      contact_personal_state: customer.state ? customer.state : '',
      contact_personal_city: customer.city ? customer.city : '',
      contact_development_api: customer.api ? customer.api : '',
      contact_development_description: customer.description
        ? customer.description
        : '',
      contact_development_productname: customer.productname
        ? customer.productname
        : '',
      contact_development_treatment: customer.treatment
        ? customer.treatment
        : '',
      contact_development_controlledsubstance: customer.controlledsubstance
        ? customer.controlledsubstance
        : '',
      contact_development_dosage: customer.dosage ? customer.dosage : '',
      contact_development_administrationroute: customer.administrationroute
        ? customer.administrationroute
        : '',
      contact_development_administrationrouteOther: customer.administrationrouteOther
        ? customer.administrationrouteOther
        : '',
      contact_development_indication: customer.indication
        ? customer.indication
        : '',
      contact_development_species: customer.species ? customer.species : '',
      contact_development_speciesOther: customer.speciesOther
        ? customer.speciesOther
        : '',
      contact_development_regulatoryinteraction: customer.regulatoryinteraction
        ? customer.regulatoryinteraction
        : ''
    };

    return item;
  }

  CustomerToObject(): ICustomerContact {
    let personal = this.fs.getForm('contact_personal').getRawValue();
    let development = this.fs.getForm('contact_development').getRawValue();
    let item: ICustomerContact = {
      firstname: personal.contact_personal_firstname,
      position: personal.contact_personal_position,
      email: personal.contact_personal_email,
      company: personal.contact_personal_company,
      website: personal.contact_personal_website,
      linkedIn: personal.contact_personal_linkedIn,
      ownership: personal.contact_personal_ownership,
      funding: personal.contact_personal_funding,
      employees: personal.contact_personal_employees,
      country: personal.contact_personal_country,
      state: personal.contact_personal_state,
      city: personal.contact_personal_city,
      api: development.contact_development_api,
      description: development.contact_development_description,
      productname: development.contact_development_productname,
      treatment: development.contact_development_treatment,
      controlledsubstance: development.contact_development_controlledsubstance,
      dosage: development.contact_development_dosage,
      administrationroute: development.contact_development_administrationroute,
      administrationrouteOther:
        development.contact_development_administrationrouteOther,
      indication: development.contact_development_indication,
      species: development.contact_development_species,
      speciesOther: development.contact_development_speciesOther,
      regulatoryinteraction:
        development.contact_development_regulatoryinteraction
    };

    return item;
  }

  consultantToForm(consultant: IConsultantContact): IConsultantContactForm {
    console.log(consultant);

    let item: IConsultantContactForm = {
      contact_personal_firstname: consultant.firstname,
      contact_personal_email: consultant.email,
      contact_personal_company: consultant.company,
      contact_application_availabilty: consultant.availabilty,
      contact_application_availablehours: consultant.availabiltyhours,
      contact_application_treatment: consultant.treatment,
      contact_application_smallmolecule: consultant.smallmolecule,
      contact_application_smallmoleculedev: consultant.smallmoleculedev,
      contact_application_biologic: consultant.biologic,
      contact_application_biologicdev: consultant.biologicdev,
      contact_application_oligo: consultant.oligo,
      contact_application_oligodev: consultant.oligodev,
      contact_application_celltherapiedev: consultant.celltherapiedev,
      contact_application_genetherapie: consultant.genetherapie,
      contact_application_genetherapiedev: consultant.genetherapiedev,
      contact_application_administrationroute: consultant.administrationroute,
      contact_application_toxicology: consultant.toxicology,
      contact_application_toxicqualification: consultant.toxicqualification,
      contact_application_pathology: consultant.pathology,
      contact_application_adme: consultant.adme,
      contact_application_pharmacology: consultant.pharmacology,
      contact_application_devplans: consultant.devplans,
      contact_application_experience: consultant.experience,
      contact_application_phases: consultant.phases,
      contact_application_areas: consultant.areas,
      contact_application_protocoldev: consultant.protocoldev,
      contact_application_jurisdiction: consultant.jurisdiction,
      contact_application_operations: consultant.operations,
      contact_application_submissionexperience: consultant.submissionexperience,
      contact_application_regulatorystrat: consultant.regulatorystrat,
      contact_application_regulatorystratpathway:
        consultant.regulatorystratpathway,
      contact_application_safety: consultant.safety,
      contact_application_network: consultant.network,
      contact_application_networkeu: consultant.networkeu,
      contact_application_networkasia: consultant.networkasia,
      contact_application_bumgmt: consultant.bumgmt,
      contact_application_budev: consultant.budev,
      contact_application_commercestrat: consultant.commercestrat
    };
    return item;
  }

  consultantToObject(): IConsultantContact {
    let personal = this.fs.getForm('contact_personal').getRawValue();
    let application = this.fs.getForm('contact_application').getRawValue();
    console.log(personal);
    console.log(application);

    let item: IConsultantContact = {
      firstname: personal.contact_personal_firstname,
      email: personal.contact_personal_email,
      company: personal.contact_personal_company,
      availabilty: application.contact_application_availabilty,
      availabiltyhours: application.contact_application_availablehours,
      treatment: application.contact_application_treatment,
      smallmolecule: application.contact_application_smallmolecule,
      smallmoleculedev: application.contact_application_smallmoleculedev,
      biologic: application.contact_application_biologic,
      biologicdev: application.contact_application_biologicdev,
      oligo: application.contact_application_oligo,
      oligodev: application.contact_application_oligodev,
      celltherapiedev: application.contact_application_celltherapiedev,
      genetherapie: application.contact_application_genetherapie,
      genetherapiedev: application.contact_application_genetherapiedev,
      administrationroute: application.contact_application_administrationroute,
      toxicology: application.contact_application_toxicology,
      toxicqualification: application.contact_application_toxicqualification,
      pathology: application.contact_application_pathology,
      adme: application.contact_application_adme,
      pharmacology: application.contact_application_pharmacology,
      devplans: application.contact_application_devplans,
      experience: application.contact_application_experience,
      phases: application.contact_application_phases,
      areas: application.contact_application_areas,
      protocoldev: application.contact_application_protocoldev,
      jurisdiction: application.contact_application_jurisdiction,
      operations: application.contact_application_operations,
      submissionexperience:
        application.contact_application_submissionexperience,
      regulatorystrat: application.contact_application_regulatorystrat,
      regulatorystratpathway:
        application.contact_application_regulatorystratpathway,
      safety: application.contact_application_safety,
      network: application.contact_application_network,
      networkeu: application.contact_application_networkeu,
      networkasia: application.contact_application_networkasia,
      bumgmt: application.contact_application_bumgmt,
      budev: application.contact_application_budev,
      commercestrat: application.contact_application_commercestrat
    };

    return item;
  }

  sendConsultant(consultant: IConsultantContact, file: Blob) {
    let url = 'api/';

    if (environment.production) {
      url = 'https://mail.nifag349.mywhc.ca';
    }

    let data = JSON.stringify({
      data: consultant,
      role: 'consultant',
      file: file
    });

    return this.https.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
       }
    });
  }

  sendCustomer(customer: ICustomerContact, file: Blob) {
    let url = 'api/';

    if (environment.production) {
      url = 'https://mail.nifag349.mywhc.ca';
    }

    let data = JSON.stringify({
      data: customer,
      role: 'customer',
      file: file
    });

    return this.https.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
       }
    });
  }

  getFormattedConsultant(consultant: IConsultantContactForm) {
    let tmp = {};
    for (let row of ConsultantTable) {
      if(this.ts.transform(row.collumnKey) !== '') {
        tmp[this.ts.transform(row.collumnKey)] = consultant[row.collumnName];
      }
    }
    return tmp;
  }
  getFormattedCustomer(consultant: ICustomerContactForm) {
    let tmp = {};
    for (let row of ConsultantTable) {
      if(this.ts.transform(row.collumnKey) !== '') {
        tmp[this.ts.transform(row.collumnKey)] = consultant[row.collumnName];
      }
    }
    return tmp;
  }
}
