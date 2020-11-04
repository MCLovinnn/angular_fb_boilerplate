import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, NG_VALIDATORS } from '@angular/forms';
import { FormService } from '../services/form.service';
import { ConfigService } from '../services/config.service';
import { ControlpanelComponent } from './controlpanel.component';
import { Field } from '../classes/field';

describe('ControlpanelComponent', () => {
  let component: ControlpanelComponent;
  let fixture: ComponentFixture<ControlpanelComponent>;
  beforeEach(() => {
    const formBuilderStub = {};
    const formServiceStub = {
      updateConfig: object => ({}),
      getConfigByName: object => ({}),
      addForm: object => ({}),
      addConfig: object => ({}),
      getFormControl: () => ({})
    };
    const configServiceStub = {getFlatControlls: () => ({})};
    const FieldStub = {constructor: () => ({})};
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ControlpanelComponent],
      providers: [
        {provide: FormBuilder, useValue: formBuilderStub},
        {provide: FormService, useValue: formServiceStub},
        {provide: ConfigService, useValue: configServiceStub},
        {provide: NG_VALIDATORS},
        {provide: Field, useValue: FieldStub},
        {provide: FormGroup}
      ]
    });
    fixture = TestBed.createComponent(ControlpanelComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('internalType defaults to: text', () => {
    expect(component.internalType).toEqual('text');
  });
  it('functionType defaults to: [, , , ]', () => {
    expect(component.functionType).toEqual([
      {value: 'change', key: 'Änderung(Change)', description: 'Funktion die ausgeführt wird, wenn sich der Wert des Feldse ändert.'},
      {value: 'blur', key: 'Änderung(Blur)', description: 'Funktion die ausgeführt wird, wenn sich der Wert des Feldse ändert.'},
      {value: 'fokusIn', key: 'Fokus-Rein', description: 'Funktion die ausgeführt wird, wenn der User in das Feld klickt.'},
      {value: 'fokusOut', key: 'Fokus-Raus', description: 'Funktion die ausgeführt wird, wenn der User aus dem Feld klickt.'}
    ]);
  });
  it('operatorType defaults to: [, , , , , ]', () => {
    expect(component.operatorType).toEqual([
      {value: '<', key: 'Kleiner', description: 'Funktion die ausgeführt wird, wenn sich der Wert des Feldse ändert.'},
      {value: '<=', key: 'Kleiner, gleich', description: 'Funktion die ausgeführt wird, wenn sich der Wert des Feldse ändert.'},
      {value: '>', key: 'Größer', description: 'Funktion die ausgeführt wird, wenn sich der Wert des Feldse ändert.'},
      {value: '>=', key: 'Größer, gleich', description: 'Funktion die ausgeführt wird, wenn sich der Wert des Feldse ändert.'},
      {value: '===', key: 'Gleich', description: 'Funktion die ausgeführt wird, wenn der User aus dem Feld klickt.'},
      {value: '!==', key: 'Ungleich', description: 'Funktion die ausgeführt wird, wenn der User in das Feld klickt.'}
    ]);
  });
  it('actionType defaults to: [, , ]', () => {
    expect(component.actionType).toEqual([
      {
        value: 'reset',
        key: 'Aktuelles Feld zurücksetzten',
        description: 'Funktion die ausgeführt wird, wenn sich der Wert des Feldse ändert.'
      },
      {
        value: 'update',
        key: 'Zu prüfendes Feld updaten',
        description: 'Funktion die ausgeführt wird, wenn sich der Wert des Feldse ändert.'
      },
      {value: 'dialog', key: 'Einen Dialog anzeigen', description: 'Funktion die ausgeführt wird, wenn der User in das Feld klickt.'}
    ]);
  });
  it('types defaults to: [, , , ]', () => {
    expect(component.types).toEqual([
      {value: 'select', key: 'Select'},
      {value: 'text', key: 'Text'},
      {value: 'checkbox', key: 'Checkbox'},
      {value: 'date', key: 'Datum'}]);
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const formServiceStub: FormService = fixture.debugElement.injector.get(
        FormService
      );
      const configServiceStub: ConfigService = fixture.debugElement.injector.get(
        ConfigService
      );
      spyOn(formServiceStub, 'updateConfig').and.callThrough();
      spyOn(configServiceStub, 'getFlatControlls').and.callThrough();
      component.ngOnInit();
      expect(formServiceStub.updateConfig).toHaveBeenCalled();
      expect(configServiceStub.getFlatControlls).toHaveBeenCalled();
    });
  });
});
