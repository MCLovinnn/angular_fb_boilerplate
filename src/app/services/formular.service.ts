import { Injectable, EventEmitter } from '@angular/core';
import { IZugKopfFormular, ITeilNetz, IZugkopf, ITeilNetzFormular } from '../formular';
import _ from "lodash";

@Injectable({
  providedIn: 'root'
})
export class FormularService {
  forms: IZugKopfFormular[] = [];
  formChange: EventEmitter<IZugKopfFormular[]> = new EventEmitter();
  activeTeilNetzChange: EventEmitter<string> = new EventEmitter();
  teilNetzChange: EventEmitter<ITeilNetz[]> = new EventEmitter();
  selectedTeilnetz: string;
  obj: ITeilNetz[] = [];

  constructor() {
    this.formChange.subscribe((form: IZugKopfFormular[]) => {
      this.forms = form;
    });
  }

  addTeilNetz(obj: ITeilNetz) {
    let data = this.getTeilNetz(obj.id)[0];
    
    if(data) {
      _.merge(data, obj);
    } else {
      this.obj.push(obj);
    }
    
    this.teilNetzChange.emit(this.obj);
  }

  getTeilNetz(id: string) {
    return this.obj.filter((value: ITeilNetz, index) => {
      return value.id === id;
    });
  }

  setActualTeilNetz(obj?: ITeilNetzFormular) {
    if (obj) {
      this.selectedTeilnetz = obj.konfiguration_teilnetz_id;
    } else {
    this.selectedTeilnetz = '';
    }
    
    this.activeTeilNetzChange.emit(this.selectedTeilnetz);
  }

  getActualTeilNetzChange() {
    return this.activeTeilNetzChange;
  }

  getTeilNetzChange() {
    return this.teilNetzChange;
  }

  getActualTeilNetz() {
    return this.selectedTeilnetz;
  }


  add(formular: IZugKopfFormular) {
    if(this.selectedTeilnetz) {
      const newForms = this.forms;
      newForms.push(formular);
      this.addTeilNetz({
        id: this.selectedTeilnetz,
        config: {
          tsi: false
        },
        zugkopf: this.zugkopfToObject(formular)
      });
      // console.log(newForms);
      this.formChange.emit(newForms);
    }
  }

  get() {
    return this.formChange;
  }

  update(entry: IZugKopfFormular) {
    const newForms = this.forms;
    _.merge(newForms, [entry]);
    this.formChange.emit(newForms);
  }

  delete(entry: IZugKopfFormular) {
    const newForms = this.forms;
    let index = newForms.indexOf(entry);

    if (index >= 0) {
      newForms.splice(index, 1);
      this.formChange.emit(newForms);
    }
  }

  teilNetzFromObject(entry: ITeilNetz): ITeilNetzFormular {
    return {
      konfiguration_teilnetz_id: entry.id,
      konfiguration_teilnetz_tsi: entry.config.tsi
    };
  }

  teilNetzToObject(entry: ITeilNetzFormular): ITeilNetz {
    let tmpTeilNetz: ITeilNetz = this.getTeilNetz(entry.konfiguration_teilnetz_id)[0];
    tmpTeilNetz.config.tsi = entry.konfiguration_teilnetz_tsi;

    return tmpTeilNetz;
  }

  zugkopfFromObject(entry: IZugkopf): IZugKopfFormular {
    return {
      konfiguration_zugkopf_background: entry.background,
      konfiguration_zugkopf_fontcolor: entry.font.color,
      konfiguration_zugkopf_fontsize: entry.font.fontsize,
      konfiguration_zugkopf_linedefaultcolor: entry.linie_deafult.color,
      konfiguration_zugkopf_linedefaultfont: entry.linie_deafult.font.font,
      konfiguration_zugkopf_linedefaultfontcolor: entry.linie_deafult.font.color,
      konfiguration_zugkopf_zusatzdatum: entry.zusatz.datum,
      konfiguration_zugkopf_zusatzuhrzeit: entry.zusatz.uhrzeit,
      konfiguration_zugkopf_zusatzicondatum: entry.zusatz.icons.datum,
      konfiguration_zugkopf_zusatziconuhrzeit: entry.zusatz.icons.uhrzeit,
      konfiguration_zugkopf_linecolor: entry.linie.color ? entry.linie.color : '',
      konfiguration_zugkopf_linefont: entry.linie.font.font ? entry.linie.font.font : '',
      konfiguration_zugkopf_linefontcolor: entry.linie.font.color ? entry.linie.font.color : ''
    };
  }

  zugkopfToObject(entry: IZugKopfFormular): IZugkopf {
    return {
      background: entry.konfiguration_zugkopf_background,
      font: {
        color: entry.konfiguration_zugkopf_fontcolor,
        fontsize: entry.konfiguration_zugkopf_fontsize,
      },
      linie_deafult: {
        color: entry.konfiguration_zugkopf_linedefaultcolor,
        font: {
          font: entry.konfiguration_zugkopf_linedefaultfont,
          color: entry.konfiguration_zugkopf_linedefaultfontcolor,
        }
      },
      zusatz: {
        datum: entry.konfiguration_zugkopf_zusatzdatum,
        uhrzeit: entry.konfiguration_zugkopf_zusatzuhrzeit,
        icons: {
          datum: entry.konfiguration_zugkopf_zusatzicondatum,
          uhrzeit: entry.konfiguration_zugkopf_zusatziconuhrzeit,
        }
      },
      linie: {
        color: entry.konfiguration_zugkopf_linecolor,
        font: {
          font: entry.konfiguration_zugkopf_linefont,
          color: entry.konfiguration_zugkopf_linefontcolor,
        }
      }
    }
  }
}
