export interface IZugKopfFormular {
  konfiguration_zugkopf_background: string;
  konfiguration_zugkopf_fontcolor: string;
  konfiguration_zugkopf_fontsize: string;
  konfiguration_zugkopf_linedefaultcolor: string;
  konfiguration_zugkopf_linedefaultfont: string;
  konfiguration_zugkopf_linedefaultfontcolor: string;
  konfiguration_zugkopf_zusatzdatum: boolean;
  konfiguration_zugkopf_zusatzuhrzeit: boolean;
  konfiguration_zugkopf_zusatzicondatum: boolean;
  konfiguration_zugkopf_zusatziconuhrzeit: boolean;
  konfiguration_zugkopf_linecolor?: string;
  konfiguration_zugkopf_linefont?: string;
  konfiguration_zugkopf_linefontcolor?: string;
}

export interface ITeilNetzFormular {
  konfiguration_teilnetz_tsi: boolean;
  konfiguration_teilnetz_id: string;
}

export interface IZugkopf {
  background: string;
  font: {
    color: string;
    fontsize?: string;
  };
  linie_deafult: {
    color: string;
    font: {
      font: string;
      color: string;
    }
  };
  zusatz: {
    datum: boolean;
    uhrzeit: boolean;
    icons: {
      datum: boolean;
      uhrzeit: boolean;
    }
  };
  linie?: {
    color: string;
    font: {
      font: string;
      color: string;
    }
  };
}

export interface ITeilNetz {
  config: {
    tsi: boolean;
  };
  zugkopf: IZugkopf;
  lang?: string;
  id?: string;
}