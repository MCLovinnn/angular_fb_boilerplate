import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { ConnectorService } from '../services/connector.service';
import { IingredientForm, Iingredient, IRecepyForm } from '../formular';
import { FormularService } from '../services/formular.service';
import { FormService } from 'projects/formbuilder/src/public-api';

@Component({
  selector: 'app-recepy',
  templateUrl: './recepy.component.html',
  styleUrls: ['./recepy.component.scss']
})
export class RecepyComponent implements OnInit, AfterViewInit {
  breakpoint = 12;
  WIDTH = 1080;
  HEIGHT = 720;

  @ViewChild('video')
  public video: ElementRef;

  @ViewChild('canvas')
  public canvas: ElementRef;

  captures: string[] = [];
  picture: string;
  error: any;
  isCaptured: boolean;
  ingredients: Iingredient[] = [];
  actual_ingredient: number = null;
  ingredientForm = this.fs.getForm('home_ingredient');

  ngOnInit() {
    this.breakpoint = window.innerWidth <= 600 ? 4 : 12;
    let recepy = this.formS.getSelectedRecepy();
    console.log(recepy);
    if(recepy) {
      this.fs.getForm('home_recepy').patchValue(this.formS.recepyToForm(recepy));
    }
  }

  constructor(private cs: ConnectorService, private fs: FormService, private formS: FormularService) {}

  onResize(event) {
    this.breakpoint = event.target.innerWidth <= 600 ? 4 : 12;
  }

  async ngAfterViewInit() {
    await this.setupDevices();
  }

  async setupDevices() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true
        });
        if (stream) {
          this.video.nativeElement.srcObject = stream;
          this.video.nativeElement.play();
          this.error = null;
        } else {
          this.error = 'You have no output video device';
        }
      } catch (e) {
        this.error = e;
      }
    }
  }

  capture() {
    this.drawImageToCanvas(this.video.nativeElement);
    this.picture = this.canvas.nativeElement.toDataURL('image/jpeg');
    this.captures.push(this.picture);
    this.isCaptured = true;
  }

  removeCurrent() {
    this.isCaptured = false;
  }

  setPhoto(idx: number) {
    this.isCaptured = true;
    var image = new Image();
    image.src = this.captures[idx];
    this.drawImageToCanvas(image);
  }

  drawImageToCanvas(image: any) {
    this.canvas.nativeElement
      .getContext('2d')
      .drawImage(image, 0, 0, this.WIDTH, this.HEIGHT);
  }

  doIt() {
    if(this.picture) {
      this.cs.ocrReq(this.picture, 'ger').subscribe(res => console.log(res));
    }
    this.formS.addRecepy(this.formS.recepyToObject(this.fs.getForm('home_recepy').getRawValue() as IRecepyForm));
    this.fs.resetForms();
  }

  addIngredient() {
    const tmp = this.ingredientForm.getRawValue() as IingredientForm;
    if (this.actual_ingredient != null) {
      this.ingredients.splice(this.actual_ingredient, 1);
    }

    this.ingredients.push({
      name: tmp.home_ingredient_ingredients,
      amount: tmp.home_ingredient_ingredientsamount,
      type: tmp.home_ingredient_ingredientstype
    });
    this.resetIng();
  }

  edit(ingredient: Iingredient, index: number) {
    console.log(index);

    this.actual_ingredient = index;
    this.ingredientForm.patchValue({
      home_ingredient_ingredients: ingredient.name,
      home_ingredient_ingredientsamount: ingredient.amount,
      home_ingredient_ingredientstype: ingredient.type
    });
  }

  resetIng() {
    this.ingredientForm.reset();
    this.fs
      .getFormControl({ name: 'home_ingredient_ingredientstype' })
      .patchValue('Gramm');
    this.actual_ingredient = null;
  }
}
