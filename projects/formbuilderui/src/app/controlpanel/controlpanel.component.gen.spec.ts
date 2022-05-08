import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormGroup, FormBuilder, NG_VALIDATORS } from '@angular/forms';
import { ControlpanelComponent } from './controlpanel.component';
import { FormService, ConfigService } from '../../../../formbuilder/src/public-api';

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
        {provide: FormGroup, useValue: formBuilderStub},
        {provide: FormService, useValue: formServiceStub},
        {provide: ConfigService, useValue: configServiceStub},
        {provide: NG_VALIDATORS},
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
